'use client';

import { useState, useEffect, useRef } from 'react';
import { Client, Message } from 'paho-mqtt';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function MqttPage() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<{topic: string, payload: string, timestamp: Date}[]>([]);
  const [topic, setTopic] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [publishTopic, setPublishTopic] = useState('');
  const [publishPayload, setPublishPayload] = useState('');
  const [connectionSettings, setConnectionSettings] = useState({
    broker: process.env.NEXT_PUBLIC_MQTT_BROKER || 'mqtt.portabo.cz',
    port: parseInt(process.env.NEXT_PUBLIC_MQTT_PORT || '8883'),
    clientId: `nextjs_client_${Math.random().toString(16).substring(2, 10)}`,
    username: process.env.NEXT_PUBLIC_MQTT_USERNAME || 'rv-catcher',
    password: process.env.NEXT_PUBLIC_MQTT_PASSWORD || 'D6U5ERM7VAIdh7vaCa4fg6Leh',
  });
  
  const clientRef = useRef<Client | null>(null);

    const connect = () => {
    try {
        setError(null);
        
        // Determine WebSocket protocol based on port
        const useSecure = connectionSettings.port === 8883 || connectionSettings.port === 443;
        const wsProtocol = useSecure ? "wss://" : "ws://";
        const websocketUrl = `${wsProtocol}${connectionSettings.broker}:${connectionSettings.port}/mqtt`;
        
        console.log(`Attempting to connect to: ${websocketUrl}`);
        
        const client = new Client(
        connectionSettings.broker,
        connectionSettings.port,
        '/mqtt',  // Path
        connectionSettings.clientId
        );

        client.onConnectionLost = (responseObject) => {
        console.log('Connection lost:', responseObject);
        setConnected(false);
        
        // Enhanced error message with more context
        if (responseObject.errorCode !== 0) {
            setError(`Connection lost: ${responseObject.errorMessage} (Code: ${responseObject.errorCode})`);
        }
        };

        client.onMessageArrived = (message: Message) => {
        console.log('Message received:', message.destinationName, message.payloadString);
        setMessages(prev => [...prev, {
            topic: message.destinationName,
            payload: message.payloadString,
            timestamp: new Date()
        }]);
        };

        // Define type for MQTT connect options
        interface MqttConnectOptions {
        onSuccess: () => void;
        onFailure: (err: any) => void;
        useSSL: boolean;
        timeout: number;
        userName?: string;
        password?: string;
        keepAliveInterval?: number;
        reconnect?: boolean;
        mqttVersion?: 3 | 4;
        }

        // Connect options with enhanced settings
        const options: MqttConnectOptions = {
        onSuccess: () => {
            console.log('Connected successfully to MQTT broker');
            setConnected(true);
            
            // Subscribe to default topic if provided
            if (topic) {
            subscribeToTopic(topic);
            }
        },
        onFailure: (err: any) => {
            console.error('Connection failed:', err);
            
            // Enhanced error message with troubleshooting guidance
            let errorMsg = `Connection failed: ${err.errorMessage}`;
            
            if (err.errorMessage.includes('Socket error')) {
            errorMsg += `. Možné příčiny: 
            - Broker nemusí podporovat WebSocket
            - Port ${connectionSettings.port} může být blokován
            - SSL/TLS konfigurace není správná
            - Zkuste změnit port (8883 pro SSL, 8083 pro nezabezpečené připojení)`;
            }
            
            setError(errorMsg);
        },
        useSSL: useSecure,  // Use SSL based on port
        timeout: 15,         // Increased timeout for more reliable connections
        keepAliveInterval: 30,  // Keep alive interval in seconds
        reconnect: true,    // Enable automatic reconnection
        mqttVersion: 4,     // MQTT v4
        };

        // Add credentials if provided
        if (connectionSettings.username && connectionSettings.password) {
        options.userName = connectionSettings.username;
        options.password = connectionSettings.password;
        }

        console.log('Connecting with options:', { ...options, password: '********' });
        client.connect(options);
        clientRef.current = client;
    } catch (err) {
        console.error('Error creating connection:', err);
        setError(`Error creating connection: ${err instanceof Error ? err.message : String(err)}`);
    }
    };

    const testConnection = async () => {
        try {
            setError(null);
            const useSecure = connectionSettings.port === 8883 || connectionSettings.port === 443;
            const protocol = useSecure ? 'https://' : 'http://';
            const testUrl = `${protocol}${connectionSettings.broker}/health`;
            
            setError("Testování připojení...");
            
            // Simple ping to check if server is reachable
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            try {
            await fetch(testUrl, { 
                method: 'HEAD',
                signal: controller.signal
            });
            setError("Server je dostupný, ale neznamená to, že MQTT WebSocket port je otevřený.");
            } catch (err) {
            // Server might not have a health endpoint, but that's OK
            setError(`Server neodpovídá na HTTP požadavky, ale MQTT připojení může stále fungovat.`);
            } finally {
            clearTimeout(timeoutId);
            }
        } catch (err) {
            setError(`Test connection failed: ${err instanceof Error ? err.message : String(err)}`);
        }
        };

  const disconnect = () => {
    if (clientRef.current && clientRef.current.isConnected()) {
      clientRef.current.disconnect();
      setConnected(false);
      setMessages([]);
    }
  };

  const subscribeToTopic = (topicToSubscribe: string) => {
    if (!topicToSubscribe) {
      setError('Please enter a topic to subscribe');
      return;
    }

    if (clientRef.current && clientRef.current.isConnected()) {
      try {
        clientRef.current.subscribe(topicToSubscribe);
        setTopic(topicToSubscribe);
        setError(null);
      } catch (err) {
        setError(`Failed to subscribe: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      setError('Not connected to MQTT broker');
    }
  };

  const unsubscribeFromTopic = (topicToUnsubscribe: string) => {
    if (clientRef.current && clientRef.current.isConnected()) {
      try {
        clientRef.current.unsubscribe(topicToUnsubscribe);
        setTopic('');
      } catch (err) {
        setError(`Failed to unsubscribe: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  // Function similar to send_payload in the Python code
  const publishMessage = () => {
    if (!publishTopic) {
      setError('Please enter a topic to publish to');
      return;
    }

    if (!publishPayload) {
      setError('Please enter a payload to publish');
      return;
    }

    if (clientRef.current && clientRef.current.isConnected()) {
      try {
        // Format topic similar to the Python code - prefix with /rv-catcher/ if not already
        let formattedTopic = publishTopic;
        const prefix = '/rv-catcher/';
        if (!formattedTopic.startsWith(prefix)) {
          formattedTopic = prefix + formattedTopic;
        }

        const message = new Message(publishPayload);
        message.destinationName = formattedTopic;
        message.qos = 0;
        message.retained = false;
        
        clientRef.current.send(message);
        setError(null);
        
        // Add to messages for display
        setMessages(prev => [...prev, {
          topic: formattedTopic,
          payload: publishPayload,
          timestamp: new Date()
        }]);
        
        // Clear payload after sending
        setPublishPayload('');
      } catch (err) {
        setError(`Failed to publish: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      setError('Not connected to MQTT broker');
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (clientRef.current && clientRef.current.isConnected()) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <div className="flex justify-start items-center mb-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
              <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Zpět na hlavní menu</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">MQTT Monitor</h1>
          <p className="text-gray-600 mt-1 text-center mb-6">Monitorování a testování MQTT zpráv</p>
        </header>
      
        {/* Connection Settings */}
        <div className="mb-6 p-6 border border-secondary rounded-lg bg-background shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nastavení připojení</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Broker</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded"
                value={connectionSettings.broker}
                onChange={(e) => setConnectionSettings({...connectionSettings, broker: e.target.value})}
                disabled={connected}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Port</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded"
                type="number"
                value={connectionSettings.port} 
                onChange={(e) => setConnectionSettings({...connectionSettings, port: parseInt(e.target.value)})}
                disabled={connected}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Username</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded"
                value={connectionSettings.username}
                onChange={(e) => setConnectionSettings({...connectionSettings, username: e.target.value})}
                disabled={connected}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Password</label>
              <input 
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                value={connectionSettings.password}
                onChange={(e) => setConnectionSettings({...connectionSettings, password: e.target.value})}
                disabled={connected}
              />
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            {!connected ? (
              <button 
                onClick={connect}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Připojit
              </button>
            ) : (
              <button 
                onClick={disconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Odpojit
              </button>
            )}
            <button 
                onClick={testConnection}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                disabled={connected}
                >
                Test připojení
            </button>
            <div>
                <label className="block text-sm mb-1 font-medium">Port</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={connectionSettings.port}
                    onChange={(e) => setConnectionSettings({...connectionSettings, port: parseInt(e.target.value)})}
                    disabled={connected}
                >
                    <option value="8883">8883 (WebSocket Secure)</option>
                    <option value="8083">8083 (WebSocket)</option>
                    <option value="443">443 (WebSocket Secure - Alternate)</option>
                    <option value="80">80 (WebSocket - Alternate)</option>
                    <option value="9001">9001 (WebSocket - Mosquitto default)</option>
                    <option value="9883">9883 (WebSocket Secure - Alternative)</option>
                </select>
            </div>
            <div className="ml-auto flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {connected ? 'Připojeno' : 'Odpojeno'}
              </span>
            </div>
          </div>
        </div>
      
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 border border-red-400 bg-red-100 text-red-700 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}
      
        {/* Subscribe */}
        <div className="mb-6 p-6 border border-secondary rounded-lg bg-background shadow-md">
          <h2 className="text-xl font-semibold mb-4">Odběr tématu</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <input 
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Zadejte téma (např. test/topic)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={!connected}
              />
            </div>
            <button 
              onClick={() => subscribeToTopic(topic)}
              disabled={!connected || !topic}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Odebírat
            </button>
            <button 
              onClick={() => unsubscribeFromTopic(topic)}
              disabled={!connected || !topic}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Zrušit odběr
            </button>
          </div>
          {topic && connected && (
            <div className="text-sm">
              Aktuální odběr tématu: 
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {topic}
              </span>
            </div>
          )}
        </div>
        
        {/* Publish Message - New section based on Python send_payload function */}
        <div className="mb-6 p-6 border border-secondary rounded-lg bg-background shadow-md">
          <h2 className="text-xl font-semibold mb-4">Odeslání zprávy</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Téma</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                  /rv-catcher/
                </span>
                <input 
                  className="flex-1 p-2 border border-gray-300 rounded-r"
                  placeholder="Zadejte téma"
                  value={publishTopic}
                  onChange={(e) => setPublishTopic(e.target.value)}
                  disabled={!connected}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Zpráva (payload)</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                placeholder="Zadejte obsah zprávy"
                value={publishPayload}
                onChange={(e) => setPublishPayload(e.target.value)}
                disabled={!connected}
              />
            </div>
            <button
              onClick={publishMessage}
              disabled={!connected || !publishTopic || !publishPayload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Odeslat zprávu
            </button>
          </div>
        </div>
      
        {/* Messages */}
        <div className="p-6 border border-secondary rounded-lg bg-background shadow-md">
          <h2 className="text-xl font-semibold mb-4">Zprávy</h2>
          <div className="max-h-[400px] overflow-y-auto border rounded-md p-2">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center py-4">Zatím nebyly přijaty žádné zprávy</div>
            ) : (
              <ul className="space-y-2">
                {messages.map((msg, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="font-medium">Téma: {msg.topic}</span>
                      <span>{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <pre className="bg-gray-100 p-2 rounded mt-1 text-sm overflow-x-auto">
                      {msg.payload}
                    </pre>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="mt-4 px-3 py-1 border border-gray-300 bg-white text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors"
            >
              Vymazat zprávy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
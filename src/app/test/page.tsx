'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function ApiTestPage() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [bearerToken, setBearerToken] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const fullUrl = `http://localhost:8000/${url.startsWith('/') ? url.substring(1) : url}`;
      
      const headers: HeadersInit = {
        'Accept': 'application/json',
      };
      
      if (bearerToken) {
        headers['Authorization'] = `Bearer ${bearerToken}`;
      }
      
      // Add Content-Type header for methods that may have a body
      if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
        headers['Content-Type'] = 'application/json';
      }

      const requestOptions: RequestInit = {
        method,
        headers,
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
        try {
          requestOptions.body = requestBody.trim() ? JSON.stringify(JSON.parse(requestBody)) : undefined;
        } catch (err) {
          setError('Invalid JSON in request body');
          setLoading(false);
          return;
        }
      }

      console.log(`Sending ${method} request to ${fullUrl}`);
      const res = await fetch(fullUrl, requestOptions);
      
      let responseData;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: responseData
      });
    } catch (err) {
      setError(`Request failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const formatJSON = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return String(data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8">
          <div className="flex justify-start items-center mb-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group">
              <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Zpět na hlavní menu</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center">API Test Tool</h1>
          <p className="text-gray-600 mt-1 text-center mb-6">Test API endpoints with different HTTP methods</p>
        </header>
        
        {/* Request Form */}
        <form onSubmit={handleSubmit} className="mb-8 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* HTTP Method */}
              <div className="w-full md:w-1/4">
                <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                  HTTP Method
                </label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                  <option value="HEAD">HEAD</option>
                  <option value="OPTIONS">OPTIONS</option>
                </select>
              </div>
              
              {/* URL Input */}
              <div className="w-full md:w-3/4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  API Endpoint
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    http://localhost:8000/
                  </span>
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="api/v1/devices"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Bearer Token */}
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                Bearer Token (Optional)
              </label>
              <input
                type="text"
                id="token"
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                placeholder="Enter your JWT token here"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Request Body */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                Request Body (for POST, PUT, PATCH)
              </label>
              <textarea
                id="body"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder={`{\n  "key": "value"\n}`}
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
                disabled={!['POST', 'PUT', 'PATCH'].includes(method)}
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !url}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </form>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border border-red-400 bg-red-100 text-red-700 rounded-lg" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {/* Response Display */}
        {response && (
          <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Response</h2>
            
            {/* Status */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                  response.status >= 200 && response.status < 300
                    ? 'bg-green-100 text-green-800'
                    : response.status >= 400
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {response.status}
                </span>
                <span>{response.statusText}</span>
              </div>
            </div>
            
            {/* Headers */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Headers</h3>
              <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-xs">
                {formatJSON(response.headers)}
              </pre>
            </div>
            
            {/* Body */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Response Body</h3>
              <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm max-h-96">
                {formatJSON(response.data)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
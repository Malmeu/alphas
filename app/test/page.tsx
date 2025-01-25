'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/config';

export default function TestPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log('Session data:', data);
      console.log('Session error:', error);
      setSession(data.session);
      setLoading(false);
    }
    checkSession();
  }, []);

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'darkvid3r@gmail.com',
      password: 'password123',
      options: {
        data: {
          role: 'admin'
        }
      }
    });
    console.log('SignUp result:', { data, error });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Page de Test</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">État de la Session :</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Créer un compte admin
      </button>
    </div>
  );
}

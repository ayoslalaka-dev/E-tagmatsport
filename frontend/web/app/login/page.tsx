'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Ship, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-page">
            <Link href="/" className="back-home">
                <Ship size={24} color="#3b82f6" />
                <span>E-TAGMAT</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card"
            >
                <div className="card-header">
                    <h1>Welcome back</h1>
                    <p>Login to access your dashboard</p>
                </div>

                <form className="login-form">
                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={20} color="#94a3b8" />
                            <input
                                type="email"
                                placeholder="james@logistics.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={20} color="#94a3b8" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Sign In <ArrowRight size={20} />
                    </button>
                </form>

                <div className="card-footer">
                    <p>Don&apos;t have an account? <Link href="/register">Create one</Link></p>
                </div>
            </motion.div>

            <div className="background-decor">
                <div className="circle-1" />
                <div className="circle-2" />
            </div>

            <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
          position: relative;
          overflow: hidden;
        }

        .back-home {
          position: absolute;
          top: 40px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 1.2rem;
          color: white;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 48px;
          z-index: 10;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        .card-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .card-header h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .card-header p {
          color: var(--text-muted);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .input-wrapper {
          background: var(--surface-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          height: 56px;
          transition: all 0.3s;
        }

        .input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .input-wrapper input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          padding: 0 12px;
          font-size: 1rem;
          outline: none;
        }

        .login-button {
          background: var(--primary);
          color: white;
          height: 56px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 16px;
          transition: all 0.3s;
        }

        .login-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .card-footer {
          margin-top: 40px;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .card-footer Link {
          color: var(--primary);
          font-weight: 600;
        }

        .background-decor .circle-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          z-index: 1;
        }

        .background-decor .circle-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
          bottom: -150px;
          left: -150px;
          z-index: 1;
        }
      `}</style>
        </div>
    );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ship, ArrowRight, Package, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="hero-section">
      <nav className="navbar">
        <div className="logo">
          <Ship size={24} color="#3b82f6" />
          <span>E-TAGMAT</span>
        </div>
        <div className="nav-links">
          <Link href="/login" className="login-btn">Sign In</Link>
          <Link href="/register" className="register-btn">Get Started</Link>
        </div>
      </nav>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <span className="badge">New Era of Logistics</span>
          <h1>Smart Subcontracting for <span>Modern Freight</span></h1>
          <p>
            Connect with certified carriers, optimize your groupage, and track your tenders
            in real-time with our premium logistics marketplace.
          </p>
          <div className="cta-group">
            <Link href="/login" className="cta-primary">
              Access Platform <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-image"
        >
          <div className="stats-card">
            <div className="stat">
              <Package size={20} color="#3b82f6" />
              <div>
                <strong>1,200+</strong>
                <p>Daily Tenders</p>
              </div>
            </div>
            <div className="divider" />
            <div className="stat">
              <Shield size={20} color="#10b981" />
              <div>
                <strong>100%</strong>
                <p>Verified Carriers</p>
              </div>
            </div>
          </div>
          <div className="glow-effect" />
        </motion.div>
      </div>

      <style jsx>{`
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 5%;
          position: relative;
          overflow: hidden;
        }

        .navbar {
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          letter-spacing: -1px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .login-btn {
          color: var(--text-muted);
          font-weight: 600;
          transition: color 0.3s;
        }

        .login-btn:hover {
          color: white;
        }

        .register-btn {
          background: var(--surface-light);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          border: 1px solid var(--border);
          transition: all 0.3s;
        }

        .register-btn:hover {
          background: white;
          color: black;
        }

        .hero-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          padding-top: 40px;
        }

        .hero-text .badge {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 24px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .hero-text h1 {
          font-size: 4.5rem;
          line-height: 1;
          margin-bottom: 24px;
        }

        .hero-text h1 span {
          color: var(--primary);
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          font-size: 1.25rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 40px;
        }

        .cta-primary {
          background: var(--primary);
          color: white;
          padding: 18px 36px;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .cta-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
        }

        .hero-image {
          position: relative;
          height: 600px;
          background: var(--surface) url('/cargo-ship.jpg') center/cover no-repeat;
          border-radius: 40px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .stats-card {
          position: absolute;
          bottom: 40px;
          left: -30px;
          background: var(--surface-light);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--border);
          display: flex;
          gap: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat strong {
          display: block;
          font-size: 1.2rem;
        }

        .stat p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .divider {
          width: 1px;
          background: var(--border);
        }

        .glow-effect {
          position: absolute;
          width: 80%;
          height: 80%;
          background: var(--primary);
          filter: blur(150px);
          opacity: 0.1;
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            padding-bottom: 100px;
          }
          .hero-text h1 { font-size: 3rem; }
          .hero-text p { margin: 0 auto 40px; }
          .hero-image { height: 400px; }
          .stats-card { left: 50%; transform: translateX(-50%); bottom: -40px; }
        }
      `}</style>
    </main>
  );
}

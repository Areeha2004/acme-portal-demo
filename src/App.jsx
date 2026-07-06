import { useState } from 'react';

const STATS = [
  { label: 'Revenue', value: '$48,250', delta: '+12.4%' },
  { label: 'Active users', value: '3,180', delta: '+3.1%' },
  { label: 'Open tickets', value: '27', delta: '-8.0%' },
  { label: 'Uptime', value: '99.98%', delta: '+0.1%' },
];

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (email && password) onLogin(email);
  };

  return (
    <div className="login-wrap">
      <form className="card login-card" onSubmit={submit}>
        <div className="brand">Acme Portal</div>
        <p className="muted">Sign in to your workspace</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <div className="login-actions">
          <button type="submit" className="btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  return (
    <div className="dash">
      <header className="topbar">
        <div className="brand">Acme Portal</div>
        <div className="topbar-right">
          <span className="muted">{user}</span>
          <button className="btn-ghost" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <main className="dash-body">
        <h1>Welcome back 👋</h1>
        <p className="muted">Here's what's happening across your workspace today.</p>

        <div className="stat-grid">
          {STATS.map((s) => (
            <div className="card stat" key={s.label}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-delta ${s.delta.startsWith('-') ? 'down' : 'up'}`}>{s.delta}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return user ? (
    <Dashboard user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  );
}

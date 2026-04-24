import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn without limits
        </h1>
        <p className="mt-3 max-w-xl text-indigo-100">
          Browse thousands of courses, track your progress, and master new skills
          at your own pace.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/courses">
            <Button variant="secondary" size="lg">
              Browse Courses
            </Button>
          </Link>
          <Link to="/enrolled">
            <Button variant="outline" size="lg" className="!border-white/40 !text-white hover:!bg-white/10">
              My Learning
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          { title: '500+ Courses', desc: 'Across web, data, design and more.' },
          { title: 'Track Progress', desc: 'See completion and time invested.' },
          { title: 'Self-Paced', desc: 'Learn whenever it fits your schedule.' },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

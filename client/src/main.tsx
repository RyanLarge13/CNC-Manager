import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { jobs, steps, type Step } from './blocks';
import './style.css';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });
const filters: Array<[Step | 'active', string]> = [
  ['active', 'Active queue'],
  [0, steps[0]], [1, steps[1]], [2, steps[2]],
  [3, steps[3]], [4, steps[4]], [5, steps[5]],
];

function App() {
  const [filter, setFilter] = useState<Step | 'active'>('active');
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW();
  const visibleJobs = jobs.map(job => ({
    ...job,
    blocks: job.blocks
      .filter(block => block.activeSteps.some(step => filter === 'active' ? step !== 5 : step === filter))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.id.localeCompare(b.id)),
  })).filter(job => job.blocks.length > 0)
    .sort((a, b) => a.blocks[0].dueDate.localeCompare(b.blocks[0].dueDate));

  return (
    <>
      <header>
        <h1>CNC Manager</h1>
        {needRefresh && <button onClick={() => void updateServiceWorker(true)}>Apply update</button>}
      </header>
      <main>
        <nav aria-label="Workflow filters">
          {filters.map(([value, label]) => (
            <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
          ))}
        </nav>
        {visibleJobs.length === 0 && <p>No blocks in this step.</p>}
        {visibleJobs.map(job => (
          <section key={job.id} aria-labelledby={job.id}>
            <h2 id={job.id}>{job.address} <small>{job.id}</small></h2>
            <div className="table-wrap">
              <table aria-labelledby={job.id}>
                <thead><tr><th>Style</th><th>Block ID</th><th>Due</th><th>Molds</th><th>Workflow</th><th>Drawing</th></tr></thead>
                <tbody>
                  {job.blocks.map(block => (
                    <tr key={block.id}>
                      <th scope="row">{block.style}</th>
                      <td>{block.id}</td>
                      <td><time dateTime={block.dueDate}>{dateFormat.format(new Date(block.dueDate))}</time></td>
                      <td>{block.moldCount}</td>
                      <td>{block.activeSteps.map(step => <span className="step" key={step}>{steps[step]}</span>)}</td>
                      <td>{block.drawingUrl ? <a href={block.drawingUrl}>PDF</a> : <button disabled>PDF</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<App />);

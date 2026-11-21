import Image from 'next/image';
import type { Experience } from '@/lib/portfolio';

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return <div className="profile-page-shell profile-timeline">
    {items.map((item, index) => {
      const isFeatured = index === 0;
      return <article className={`profile-experience${isFeatured ? ' is-featured' : ''}`} key={item.company}>
        <div className="profile-experience-index"><span>0{index + 1}</span><i /></div>
        <div className="profile-experience-meta">
          {item.logo ? <Image className={item.logoAspect ? `is-${item.logoAspect}` : ''} src={item.logo} alt={item.company} width={240} height={80} sizes="145px" /> : <strong>{item.company}</strong>}
          <p><time dateTime={item.start.dateTime}>{item.start.label}</time> — <time dateTime={item.end.dateTime}>{item.end.label}</time></p>
          <span>{item.location}</span>
        </div>
        <div className="profile-experience-content">
          <p className="profile-experience-type">{item.type}</p>
          <h3>{item.role}</h3>
          <p className="profile-experience-summary">{item.body}</p>

          <p className="profile-experience-impact-label">{isFeatured ? 'Résultats pour le Business Development Hub' : 'Résultats et contributions'}</p>
          <ul className="profile-experience-highlights">{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>

          <div className="profile-stack-heading"><span>Environnement technique</span><i /></div>
          <ul className="profile-stack" aria-label={`Technologies utilisées chez ${item.company}`}>{item.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
        </div>
      </article>;
    })}
  </div>;
}

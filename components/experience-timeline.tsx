import Image from 'next/image';
import type { Experience } from '@/lib/portfolio';

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return <div className="profile-page-shell profile-timeline">
    {items.map((item, index) => {
      return <article className={`profile-experience${item.focusAreas ? ' is-featured' : ''}`} key={item.company}>
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

          {item.focusAreas ? <ol className="experience-focus-list" aria-label="Contributions chez Dassault Systèmes">{item.focusAreas.map((area, focusIndex) => <li key={area.label}>
            <div className="experience-focus-label"><span>0{focusIndex + 1}</span><strong>{area.label}</strong></div>
            <h4>{area.title}</h4>
            <p>{area.description}</p>
          </li>)}</ol> : <ul className="profile-experience-highlights">{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>}

          <div className="profile-stack-heading"><span>Environnement technique</span><i /></div>
          <ul className="profile-stack" aria-label={`Technologies utilisées chez ${item.company}`}>{item.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
        </div>
      </article>;
    })}
  </div>;
}

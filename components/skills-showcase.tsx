import {
  siAngular, siChatbot, siClaude, siCss, siDocker, siFigma, siFramer, siGit,
  siGithub, siGitlab, siGsap, siHtml5, siJavascript, siKubernetes, siLinux,
  siNextdotjs, siNodedotjs, siOpenjdk, siPostman, siPython, siReact,
  siShadcnui, siTailwindcss, siTypescript, siWebflow, type SimpleIcon,
} from 'simple-icons';
import type { Locale } from '@/lib/i18n';

type Skill = { name: string; icon?: SimpleIcon; mark?: string; color?: string };
type SkillGroup = { title: string; context: string; items: Skill[] };

const groups: SkillGroup[] = [
  {
    title: 'Frontend & interfaces',
    context: 'Interfaces web, composants et animations',
    items: [
      { name: 'Next.js', icon: siNextdotjs }, { name: 'React', icon: siReact },
      { name: 'Angular', icon: siAngular }, { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript }, { name: 'HTML5', icon: siHtml5 },
      { name: 'CSS', icon: siCss }, { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'shadcn/ui', icon: siShadcnui }, { name: 'GSAP', icon: siGsap },
    ],
  },
  {
    title: 'Backend & APIs',
    context: 'Applications, services et intégrations',
    items: [
      { name: 'Node.js', icon: siNodedotjs }, { name: 'Java / Jakarta EE', icon: siOpenjdk },
      { name: 'REST APIs', mark: 'API', color: '#2563EB' }, { name: 'Postman', icon: siPostman },
      { name: 'Python', icon: siPython },
    ],
  },
  {
    title: 'Cloud & DevOps',
    context: 'Conteneurs, systèmes et déploiement',
    items: [
      { name: 'Docker', icon: siDocker }, { name: 'Kubernetes', icon: siKubernetes },
      { name: 'AWS', mark: 'AWS', color: '#E87912' }, { name: 'Linux', icon: siLinux },
      { name: 'Git', icon: siGit }, { name: 'GitHub', icon: siGithub },
      { name: 'GitLab', icon: siGitlab },
    ],
  },
  {
    title: 'IA, data & design',
    context: 'Prototypage, analyse et outils de conception',
    items: [
      { name: 'Claude', icon: siClaude }, { name: 'OpenAI API', icon: siChatbot },
      { name: 'Power BI', mark: 'BI', color: '#C49A00' }, { name: 'Figma', icon: siFigma },
      { name: 'Framer', icon: siFramer }, { name: 'Webflow', icon: siWebflow },
    ],
  },
];

export function SkillsShowcase({ locale }: { locale: Locale }) {
  const copy = locale === 'fr' ? {
    kicker: 'Compétences', title: <>De l’interface<br /><em>au déploiement.</em></>, intro: 'Des technologies pratiquées au fil des projets, avec un rôle précis à chaque étape.',
    groupTitles: ['Frontend & interfaces', 'Backend & APIs', 'Cloud & DevOps', 'IA, data & design'],
    contexts: ['Interfaces web, composants et animations', 'Applications, services et intégrations', 'Conteneurs, systèmes et déploiement', 'Prototypage, analyse et outils de conception'],
  } : locale === 'es' ? {
    kicker: 'Competencias', title: <>De la interfaz<br /><em>al despliegue.</em></>, intro: 'Tecnologías utilizadas en proyectos reales, cada una con un papel preciso.',
    groupTitles: ['Frontend e interfaces', 'Backend y APIs', 'Cloud y DevOps', 'IA, datos y diseño'],
    contexts: ['Interfaces web, componentes y animaciones', 'Aplicaciones, servicios e integraciones', 'Contenedores, sistemas y despliegue', 'Prototipado, análisis y herramientas de diseño'],
  } : {
    kicker: 'Skills', title: <>From interface<br /><em>to deployment.</em></>, intro: 'Technologies used across real projects, each serving a clear purpose.',
    groupTitles: ['Frontend & interfaces', 'Backend & APIs', 'Cloud & DevOps', 'AI, data & design'],
    contexts: ['Web interfaces, components and animation', 'Applications, services and integrations', 'Containers, systems and deployment', 'Prototyping, analysis and design tools'],
  };
  return <section id="skills" className="skills-section section-space" aria-labelledby="skills-title"><div className="shell">
    <div className="editorial-heading"><p className="kicker">{copy.kicker}</p><div><h2 id="skills-title">{copy.title}</h2><p>{copy.intro}</p></div></div>
    <div className="skills-groups">{groups.map((group, index) => <article className="skills-group" key={group.title}>
      <div className="skills-group-heading"><span>0{index + 1}</span><div><h3>{copy.groupTitles[index]}</h3><p>{copy.contexts[index]}</p></div></div>
      <ul>{group.items.map(item => <li key={item.name}>
        {item.icon ? <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ fill: `#${item.icon.hex}` }}><path d={item.icon.path} /></svg> : <i className="skills-fallback-icon" style={{ color: item.color }}>{item.mark}</i>}
        <span>{item.name}</span>
      </li>)}</ul>
    </article>)}</div>
  </div></section>;
}

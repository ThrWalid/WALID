const leaves = [
  [82, 82, -22], [52, 132, -50], [94, 157, 20], [44, 214, -56], [94, 238, 27],
  [55, 300, -45], [108, 327, 35], [79, 390, -34], [134, 430, 44],
] as const;

export function HeroLaurels() {
  return <div className="hero-laurels" aria-hidden="true">{['left', 'right'].map(side => <svg className={`hero-laurel hero-laurel-${side}`} viewBox="0 0 180 520" key={side}>
    <path d="M158 500C111 443 78 389 67 328C55 261 57 193 88 112C97 88 109 68 125 47" />
    {leaves.map(([cx, cy, rotate], index) => <ellipse key={index} cx={cx} cy={cy} rx="14" ry="31" transform={`rotate(${rotate} ${cx} ${cy})`} />)}
  </svg>)}</div>;
}

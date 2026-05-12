const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 420)}ms`;
  revealObserver.observe(item);
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filters.forEach((filter) => {
      filter.classList.toggle('active', filter === button);
    });

    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

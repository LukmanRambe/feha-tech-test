const formatDate = (date: string) => {
  return `${new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })}`;
};

export { formatDate };

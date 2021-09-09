export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  let newDate = "";
  const ye = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(newDate);
  const mo = new Intl.DateTimeFormat("fr", { month: "short" }).format(newDate);
  const da = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(newDate);
  const month = mo.charAt(0).toUpperCase() + mo.slice(1);

  if (!isNaN(date)) {
    newDate = Date.parse(date);
  }
  newDate = new Date(date);

  return `${parseInt(da)} ${month.substr(0, 3)}. ${ye.toString().substr(2, 4)}`;
};

export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "accepted":
      return "Accepté";
    case "refused":
      return "Refused";
  }
};

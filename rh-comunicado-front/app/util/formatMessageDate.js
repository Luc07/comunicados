import date from "date-and-time";

export const formatMessageDate = (mensagemDataEnvio) => {
  const now = new Date();
  const messageDate = new Date(mensagemDataEnvio);

  if (date.isSameDay(now, messageDate)) {
    return date.format(messageDate, "HH:mm");
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.isSameDay(yesterday, messageDate)) {
    return "Ontem";
  }
  return date.format(messageDate, "DD/MM");
};

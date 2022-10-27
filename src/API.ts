export const fetch2 = async () => {
  const endpoint = `https://world-of-flags-backend.herokuapp.com/api/v1/country/`;
  try {
    const data = await fetch(endpoint);
    if (!data.ok) throw new Error(data.statusText);
    const res = await data.json();
    return res;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return message;
  }
};

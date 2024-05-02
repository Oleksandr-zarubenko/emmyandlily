const getData = async () => {
  try {
    const res = await fetch(`/api/get-price`, {
      method: "GET",
    });
    const pos = await res.json();
    return pos;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

export default getData;

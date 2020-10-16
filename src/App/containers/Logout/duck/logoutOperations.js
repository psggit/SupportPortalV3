const logoutSession = () => {
  document.cookie = "dinoisses=''";
  console.log("logout");
};

export { logoutSession };

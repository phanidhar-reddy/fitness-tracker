class Utills {
  getCurrentDateString = () => {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
}

const utills = new Utills();
export default utills;

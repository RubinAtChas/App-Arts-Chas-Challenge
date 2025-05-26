export const getMedianMoisture = (plants) => {
  let value = 0;
  plants.forEach((plant) => {
    value = value + plant.moisture / plants.length;
  });

  if (value > 60) {
    return `Jordfuktigheten ser bra ut, den ligger på ${value}% - du kan luta dig tillbaka.`;
  } else if (value >= 30) {
    return `Jordfuktigheten är okej, den ligger på ${value}% - kolla till växthuset om någon dag.`;
  } else {
    return `Jordfuktigheten är låg, den ligger på ${value}% - det är dags att vattna!`;
  }
};

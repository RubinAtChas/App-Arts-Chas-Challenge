export const getMedianMoisture = (plants) => {
  let value = 0;
  let fixedValue = 0;
  plants.forEach((plant) => {
    value = value + plant.moisture / plants.length;
    fixedValue = value.toFixed();
  });

  if (fixedValue > 60) {
    return `Jordfuktigheten ser bra ut, den ligger på ${fixedValue}% - du kan luta dig tillbaka.`;
  } else if (fixedValue >= 30) {
    return `Jordfuktigheten är okej, den ligger på ${fixedValue}% - kolla till växthuset om någon dag.`;
  } else {
    return `Jordfuktigheten är låg, den ligger på ${fixedValue}% - det är dags att vattna!`;
  }
};

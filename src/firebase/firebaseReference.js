database.ref('expensify')
  .on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
  }); 

database.ref('expensify')
  .on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
  });

database.ref('expensify')
  .once('value')
  .then((snapshot) => {
    const expenses = [];
    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    console.log(expenses);
  });

database.ref('expensify')
  .on('value', (snapshot) => {
    const expenses = [];
    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    console.log(expenses);
  });



database.ref('expensify').push({
  description: "description 1",
  note: "note 1",
  amount: 100,
  createdAt: 1
});

database.ref('expensify').push({
  description: "description 2",
  note: "note 2",
  amount: 200,
  createdAt: 2
});

database.ref('expensify').push({
  description: "description 3",
  note: "note 3",
  amount: 300,
  createdAt: 4
});

const onValueChange = database.ref().on('value', (snapshot) => {
  const resObj = snapshot.val();
  console.log(`${resObj.name} works at ${resObj.job.company} as ${resObj.job.title}.`);
  console.log(resObj.name + " works at "+resObj.job.company + " as "+resObj.job.title);
}, (error) => {
  console.log("Error: ",error);
});

database.ref().set({
  name: "Sugat Bajracharya",
  age: 21,
  stressLevel: 6,
  job: {
    title: 'Software Developer',
    company: 'Prixa'
  },
  location: {
    city: "Patan",
    country: "Nepal"
  }
}).then(() => {
  console.log("Data is saved!");
}).catch((error) => {
  console.log("Error: ",error);
});

database.ref('isSingle')
  .remove()
  .then(() => {

  }).catch((error) => {
    console.log("Error: ",error);
  });

database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle'
});
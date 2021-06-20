if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    }
    console.log('HMR update success.');
    console.log('i am entry')
  });
}

import { initializeData } from '../data/create-data';

console.log('Starting data generation...');

initializeData().then(() => {
    console.log('Data generation completed successfully.');
    process.exit(0);
}).catch((error) => {
    console.error('Failed to generate data:', error);
    process.exit(1);
});
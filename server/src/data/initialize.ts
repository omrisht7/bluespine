import fs from 'fs';
import path from 'path';
import { dataStore } from './data-store';
import { Patient } from '../types/Patient';

export const loadInitialData = async () => {
    try {
        const patientsPath = path.join(__dirname, '../../data/patients.json');
        if (!fs.existsSync(patientsPath)) {
            console.warn('No patients.json file found. Run data generation script first.');
            return;
        }

        const patientsData = fs.readFileSync(patientsPath, 'utf-8');
        const patients = JSON.parse(patientsData) as Patient[];
        
        console.log(`Loading ${patients.length} patients from patients.json...`);
        dataStore.setPatients(patients);
        console.log('✅ Patients loaded successfully');
    } catch (error) {
        console.error('Failed to load initial data:', error);
        throw error;
    }
};
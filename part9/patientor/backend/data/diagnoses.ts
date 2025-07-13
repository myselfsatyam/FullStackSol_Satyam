export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

const diagnoses: Diagnosis[] = [
  {
    "code": "M24.2",
    "name": "Disorder of ligament",
    "latin": "Morbus ligamentorum"
  },
  {
    "code": "M51.2",
    "name": "Other specified intervertebral disc displacement",
    "latin": "Alia dislocatio disci intervertebralis specificata"
  },
  {
    "code": "S03.5",
    "name": "Sprain and strain of joints and ligaments of head",
    "latin": "Distorsio et elongatio articulationum et ligamentorum capitis"
  },
  {
    "code": "J10.1",
    "name": "Influenza with other respiratory manifestations, other influenza virus code 486",
    "latin": "Influenza cum aliis manifestationibus respiratoriis, ab agente virali code 486"
  },
  {
    "code": "J06.9",
    "name": "Acute upper respiratory infection, unspecified",
    "latin": "Acute upper respiratory infection, unspecified"
  },
  {
    "code": "Z57.1",
    "name": "Occupational exposure to radiation",
    "latin": "Occupational exposure to radiation"
  },
  {
    "code": "N30.0",
    "name": "Acute cystitis",
    "latin": "Cystitis acuta"
  },
  {
    "code": "H54.7",
    "name": "Unspecified visual loss",
    "latin": "Unspecified visual loss"
  },
  {
    "code": "J03.0",
    "name": "Streptococcal tonsillitis",
    "latin": "Streptococcal tonsillitis"
  },
  {
    "code": "L60.1",
    "name": "Onycholysis",
    "latin": "Onycholysis"
  },
  {
    "code": "Z74.3",
    "name": "Need for continuous supervision",
    "latin": "Need for continuous supervision"
  },
  {
    "code": "L20",
    "name": "Atopic dermatitis",
    "latin": "Atopic dermatitis"
  },
  {
    "code": "F43.2",
    "name": "Adjustment disorders",
    "latin": "Adjustment disorders"
  },
  {
    "code": "S62.5",
    "name": "Fracture of thumb",
    "latin": "Fractura [ossis/ossium] pollicis"
  },
  {
    "code": "H35.29",
    "name": "Other proliferative retinopathy",
    "latin": "Other proliferative retinopathy"
  },
  {
    "code": "J12.82",
    "name": "Pneumonia due to coronavirus disease",
    "latin": "Pneumonia due to coronavirus disease"
  }
];

export default diagnoses; 
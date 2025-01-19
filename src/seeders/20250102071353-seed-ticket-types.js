const {v4:uuidv4}=require('uuid');
module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.bulkInsert('ticket_types', [
      {
        id: uuidv4(),
        type_code: 'CNV',
        name: 'Carnival',
        description: 'Carnival area',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        type_code: 'VVP',
        name: 'VVIP',
        description: 'VVIP area',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        type_code: 'SPW',
        name: 'Sponsor Wing',
        description: 'Sponsor Wing area',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        type_code: 'NSI',
        name: 'Invited Wing',
        description: 'Invited Wing area',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        type_code: 'GA',
        name: 'GA',
        description: 'General Admission area',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        type_code: 'VP',
        name: 'VIP',
        description: 'VIP area',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface,Sequelize) {
    await queryInterface.bulkDelete('ticket_types', {}, {});
  },
};

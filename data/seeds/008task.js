
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, title: 'polish hammers', assignedTo: 1, groupId: 1, description: "dust particles tend to turn into glass when struck, really hard to remove later (if they don't fly off and hit you in the eye)", dueDate: "2100-05-05" , listId: 1 },
        {id: 2, title: 'insulate beds', assignedTo: 4, groupId: 1, description: "he tosses and strikes when he's dreaming", dueDate: "2100-05-05" , listId: 1 },
        {id: 3, title: 'rake the leaves', assignedTo: 2, groupId: 2, description: "keep it clean", dueDate: "2100-05-05" , listId: 1 },
        {id: 4, title: 'pick up leftover beers', assignedTo: 3, groupId: 2, description: "big party yesterday, they don't stay in control", dueDate: "2100-05-05" , listId: 1 },
        {id: 5, title: 'remove lightning-struck trees', assignedTo: 1, groupId: 2, description: "too many beers -_-", dueDate: "2100-05-05" , listId: 1 },
        {id: 6, title: 'refuel jet packs', assignedTo: 2, groupId: 3, description: "almost didn't make it last time", dueDate: "2100-05-05" , listId: 1 },
        {id: 7, title: 'grease gears on iron suit', assignedTo: 4, groupId: 3, description: "the suit is making funny noises when switching states", dueDate: "2100-05-05" , listId: 1 },
        {id: 8, title: 'prepare speech for Mr. America', assignedTo: 4, groupId: 4, description: "this time, don't begin with \"I have a dream\" ", dueDate: "2100-05-05" , listId: 1 },
        {id: 9, title: 'polish shield', assignedTo: 3, groupId: 4, description: "gotta lookd good for the people", dueDate: "2100-05-05" , listId: 1 },
        {id: 10, title: "iron Mr America's suit", assignedTo: 4, groupId: 4, description: "it's been in the suitcase for too long", dueDate: "2100-05-05" , listId: 1 },
      ]);
    });
};

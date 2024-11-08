function skillsMember() {
    var member = {
        name: 'John',
        age: 33,
        skills: ['JavaScript', 'HTML', 'CSS'],
        age: function () {
            return this.age;
        }
    };
    return member;
}
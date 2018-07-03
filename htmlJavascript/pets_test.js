var expect = chai.expect;
var assert = chai.assert;

describe("Pets", function() {
  describe("constructor", function() {
    it("pet list should default to null", function() {
      var pets = new Pets();
      expect(pets.petList).to.equal(null);
    });

  });
    
  describe('#getData', () => {
    it('should throw error if no url is provided', (done) => {
      (new Pets()).getData('')
      .then(() => {
          done(new Error('Expected method to reject.'))
        })
        .catch((err) => {
          assert.isDefined(err);
          done();
        })
        .catch(done);
    });
  });
  
  describe('#flattenData', () => {
    it("should throw an error if data is not passed", function(done) {
      assert.throw(function() {new Pets().flattenData(null)}, Error, "Data must be passed to flatten function!");
      done();
    });
    it('should flatten data object', (done) => {
      var testList=[{name:"Bob",gender:"Male",pets:[{name:'Zachary'},{name:'Andrew'}]}];
      var expectedResult=[{ownerGender:"Male",petName:"Zachary"},{ownerGender:"Male",petName:"Andrew"}];
      var pets=new Pets();
      var flattenedList=pets.flattenData(testList);
      expect(JSON.stringify(flattenedList)).to.equal(JSON.stringify(expectedResult));
      done();
    });
  });
 
  
  describe('#sortData', () => {
    it('should sort array alphabetically', (done) => {
      var testList=[{petName:'Zachary'},{petName:'Andrew'}];
      var expectedResult=[{petName:'Andrew'},{petName:'Zachary'}];
      var pets=new Pets();
      var sortedList=pets.sortData(testList,'petName');
      expect(JSON.stringify(sortedList)).to.equal(JSON.stringify(expectedResult));
      done();
    });
    it("should throw an error if pets array is not passed", function(done) {
      assert.throw(function() {new Pets().sortData(null,null)}, Error, "Pets array must be passed to sort function!");
      done();
    });
    it("should throw an error if sort parameter is not passed", function(done) {
      assert.throw(function() {new Pets().sortData({pet:'pet1'},null)}, Error, "Sort parameter must be passed to sort function!");
      done();
    });
  });
  
  describe('#groupData', () => {
    it("should throw an error if pets array is not passed", function(done) {
      assert.throw(function() {new Pets().groupData(null,null)}, Error, "Pets array must be must be passed to group function!");
      done();
    });
    it("should throw an error if group parameter is not passed", function(done) {
      assert.throw(function() {new Pets().groupData({pet:'pet1'},null)}, Error, "Group parameter must be passed to group function!");
      done();
    });
  });

});
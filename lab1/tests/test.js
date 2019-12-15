// подключение встроенной библиотеки assert
var assert = require('assert');
// создание группы тестов с именем Math
 describe('Math', function() {
// Первый тест: Пояснение того, что мы тестируем
  it('should test if 3*3 = 9', function(){
// Наш тест: 3*3 должен равняться 9
   assert.equal(9, 3*3);
  });
// Второй тест: комментарий к тесту
  it('should test if (3-4)*8 = -8', function(){
// Сам тест: (3-4)*8 должен равняться -8
   assert.equal(-8, (3-4)*8);
  });
 });
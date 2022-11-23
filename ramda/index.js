import * as R from 'ramda';

console.log('======== ↓ omit ↓ ========');
// 제외할 프로퍼티 키를 등록하고, 등록된 프로퍼티 키를 제외한 객체를 반환한다.

const comment = {
    author: 'test',
    body: 'comment',
    recommentId: 'uuid-1234',
};

//lodash
// const _body = { ..._.omit(comment, ['author', 'recommentId']) };
// console.log(_body);
// console.log(_.omit(comment, ['author', 'recommentId']));

//ramda
const ejectProps = R.omit(['author', 'recommentId']);
const Rbody = { ...ejectProps(comment) };
console.log(Rbody);

console.log('======== ↓ map ↓ ========');
// 첫 인자에 실행할 함수를 등록하고, 두번째로 넘겨주는 리스트를 순회하여 등록된 함수를 적용하여 새 리스트를 반환한다.

const response1 = ['ramda', 'lodash'];
const response2 = ['functional', 'programming'];

// const custrom = fn => arr => arr.map(x => fn(x)); // R.map이 이런식으로 만들어져있지 않을까 예상해봄.

const widthHashStr = str => `#${str}`;
const hashStr = R.map(widthHashStr);

console.log(hashStr(response1));
console.log(hashStr(response2));

console.log('======== ↓ lens ↓ ========');
// 해당 프로퍼티 키의 경로값을 등록하고, 참조값에 등록된 경로를 가공한다.

const content = {
    users: [
        {
            skinfo: {
                skinType: 'inattention',
            },
        },
    ],
};

const skinTypeLens = R.lensPath(['users', 0, 'skinfo', 'skinType']);

const getter = R.view(skinTypeLens, content); //해당 객체 프로퍼티 경로에 값을 return
const setter = R.set(skinTypeLens, 'complexity', content); //해당 객체 프로퍼티 경로의 값을 2번째인자로 변경후 return
const result = R.over(skinTypeLens, R.toUpper, content); //해당 객체 프로퍼티 경로의 값들을 2번째 인자의 루틴을 돌려 return

console.log(getter);
console.log(setter);
console.log(result);

console.log('======== ↓ pluck ↓ ========');
// 해당 참조값의 프로퍼티 키를 등록하여 값을 반환한다.

const JSONArray = [{ a: 1 }, { a: 2 }];
const DimensionalArray = [
    [1, 2],
    [3, 4],
];
const object = { a: { val: 3 }, b: { val: 5 } };

const pluckA = R.pluck('a');
console.log(pluckA(JSONArray));
// _.map(JSONArray, 'a') //lodash [1, 2]

const pluckB = R.pluck(0);
console.log(pluckB(DimensionalArray));
// _.map(DimensionalArray, 0) // lodash [1, 3]

const pluckC = R.pluck('val');
console.log(pluckC(object));
// _.map(object, 'val') // lodash [3, 5] 결과값이 다름

console.log('======== ↓ pathOr ↓ ========');
// 해당 객체 프로퍼티 경로에 값이 있으면 값을 반환하고, 없으면 1번째 인자를 반환한다.

const content2 = {
    user: {
        id: 'tester',
        password: '1234',
    },
};

const getPasswordByRamda = R.pathOr('fail get', ['user', 'password']);
// const getPasswordByLodash = _.get(content2, ['user', 'password', 'fail get']); // lodash
console.log(getPasswordByRamda(content2)); //content2의 user -> password가 있다면 값을 return , 없다면 1번째 인자 'fail get'을 return

console.log('======== ↓ where ↓ ========');
// 객체로부터 스펙을 확인하고 모든 스펙을 만족하면 true 아니면 false (JS에 every랑 비슷한거 같음.)

const user = R.where({
    email: R.test(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
    ),
});

const isValid = user({ email: 'tester@naver.com' });
console.log(isValid);

console.log('======== ↓ evolve ↓ ========');
// 재귀적으로 함수를 실행시켜 얕은복사본을 반환하고, 프로퍼티 키가 존재하지않으면 해당키는 넘어간다.

const user2 = {
    name: ' testEr ',
    age: 20,
    likeCount: 20,
    unlikeCount: 0,
};

const adjustUsername = R.evolve({ name: R.pipe(R.toUpper, R.trim), birthday: R.add(100) });
console.log(adjustUsername(user2));

console.log('======== ↓ compose & pipe ↓ ========');
// compose 는 오른쪽에서 왼쪽으로 함수를 합성.
// pipe는 왼쪽에서 오른쪽으로 함수를 합성
// 둘은 실행결과만 반대이며 자동으로 커링되지않음.

const users2 = [
    {
        name: 'tester1',
        age: 20,
        likeCount: 20,
        unlikeCount: 0,
    },
    {
        name: 'tester2',
        age: 20,
        likeCount: 110,
        unlikeCount: 9,
    },
    {
        name: 'tester3',
        age: 30,
        likeCount: 10,
        unlikeCount: 50,
    },
];

const usersCompose = R.compose(
    R.reverse, // 순서 반대로
    R.sortBy(R.prop('likeCount')), //likeCount 키를 기준으로 정렬
    R.map(R.over(R.lensProp('name'), R.toUpper)) //각 객체에 name프로퍼티를 toUpper해주고 그것을 map돌려서 users2배열의 모든 원소에 적용
);
console.log(usersCompose(users2));

const usersPipe = R.pipe(
    R.map(R.over(R.lensProp('name'), R.toUpper)), //각 객체에 name프로퍼티를 toUpper해주고 그것을 map돌려서 users2배열의 모든 원소에 적용
    R.sortBy(R.prop('likeCount')), //likeCount 키를 기준으로 정렬
    R.reverse // 순서 반대로
);
console.log(usersPipe(users2));

//명령형
function sum_1_to_100() {
    let sum = 0;

    //for 나 while은 불변성을 위반한다. (즉, fp에서는 사용할 수 없음)
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    return sum;
}

console.log(sum_1_to_100());

//함수형 -> loop를 돌기위해서 재귀를 써준다
function sum_1_to_100_FP() {
    function go(sum, i) {
        if (i > 100) return sum;

        return go(sum + i, i + 1);
    }

    return go(0, 1);
}

console.log(sum_1_to_100_FP());

// ========================================================================================

function loop(fn, acc, list) {
    if (list.length === 0) return acc;

    const [head, ...tail] = list;

    return loop(fn, fn(acc, head), tail);
}

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start);
const plus = (a, b) => a + b;

console.log(loop(plus, 0, range(1, 100)));

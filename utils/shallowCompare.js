/**
 * Created by ZhangRuiTao on 2017/4/26.
 */

/**
 * 自定义浅比较
 */
const shallowCompare = (instance, nextProps, nextState) => {
	return (
        !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState)
    );
};

const shallowEqual = (objA, objB) => {
	if (is(objA, objB)) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		return false;
	}

	var keysA = Object.keys(objA);
	var keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Test for A's keys different from B.
	for (var i = 0; i < keysA.length; i++) {
		if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
			return false;
		}
	}

	return true;
};

const is = (x, y) => {
	/**
     * 类型为函数时 比较函数的字符串
     */
	if (typeof x === "function" && typeof y === "function") {
		return x.toString() === y.toString();
	}

	if (x === y) {
		return x !== 0 || y !== 0 || 1 / x === 1 / y;
	} else {
		return x !== x && y !== y;
	}
};

export {shallowCompare};


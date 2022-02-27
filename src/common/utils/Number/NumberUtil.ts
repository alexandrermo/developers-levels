export default class NumberUtil {
    static isInteger(variableToTest: any) {
        const type = typeof variableToTest;
        if (!['number', 'string'].includes(type)) {
            return false;
        }

        if (type === 'number') {
            return Number.isInteger(variableToTest);
        }

        const transformedNumber = parseInt(variableToTest, 10);

        if (Number.isNaN(transformedNumber)) {
            return false;
        }

        return true;
    }
}

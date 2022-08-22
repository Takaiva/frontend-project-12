import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice.js';

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Прибавить
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Отнять
                </button>
                <button
                    aria-label="Increment by amount value"
                    onClick={() => dispatch(incrementByAmount({ amount: 24 }))}
                >
                    Прибавить 24
                </button>
            </div>
        </div>
    );
};

export default Counter;

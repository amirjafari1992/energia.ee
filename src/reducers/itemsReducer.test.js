import { types } from '../actions/types';
import itemReducer from './itemReducer';



describe('Item Reducer' , () => {
    it('Should return new items from server', () => {
        const item = [{id: 'asd213123', name: 'asdasdasdd', amount: 1, price: 2000, description: 'asdas'}];
        const newState = itemReducer(undefined, {
            type: types.GET_PRODUCTS,
            payload: item
        });
        expect(newState).toEqual(item);
    })
})
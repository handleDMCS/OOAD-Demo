import { USER_PURCHASED_LOADED } from '../../actions/types';
import {
    POST_LISTING, 
    LISTING_POSTED_BY_OTHER,
    LOAD_LISTINGS,
    REMOVE_LISTING,
    ADD_LISTING,
    LOAD_LISTING_DETAILS,
    CLEAR_LISTING_DETAILS,
    LOAD_LISTING_IMAGE,
    IMAGE_LOADING,
    CLEAR_LISTING_IMAGE,
    LOAD_HIGHEST_BID,
    PLACE_BID,
    START_AUCTION,
    UPDATE_LISTING_IN_LISTING_LIST,
    UPDATE_LISTING_DETAILS,
    UPDATE_TIMER,
} from '../../actions/types';

const initialState = {
    listings: [],
    loading: true,
    imageLoading: true,
    listingDetails: {currentPrice: {$numberDecimal: 0}},
    loadingHighestBid: true,
    highestBid: {user: {name: ""}},
    purchaseLoading: true,
    purchased: [],
    adImage: null,
};

export default function listing(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_LISTINGS:
            return {
                ...state,
                listings: payload,
                loading: false,
            };
        
        case LOAD_LISTING_DETAILS:
            return {
                ...state,
                listingDetails: payload,
                loading: false,
            };
        
        case CLEAR_LISTING_DETAILS:
            return {
                ...state,
                listingDetails: {currentPrice: {$numberDecimal: 0}},
            };
        
        case LOAD_LISTING_IMAGE:
            return {
                ...state,
                adImage: payload,
                imageLoading: false,
            };
        
        case IMAGE_LOADING:
            return {
                ...state,
                imageLoading: true,
            };
        
        case CLEAR_LISTING_IMAGE:
            return {
                ...state,
                adImage: null,
                loading: false,
            };
        
        case UPDATE_LISTING_DETAILS:
            if (payload._id === state.listingDetails._id) {
                return {
                    ...state,
                    listingDetails: payload,
                    loading: false,
                };
            } else {
                return {
                    ...state,
                };
            }
        
        case LOAD_HIGHEST_BID:
            return {
                ...state,
                highestBid: payload,
                loadingHighestBid: false,
            };
        
        case PLACE_BID:
            return {
                ...state,
                listingDetails: {...payload.listingDetails, owner: state.listingDetails.owner},
                highestBid: payload.highestBid,
            };

        case POST_LISTING:
            return {
                ...state,
                listings: [payload, ...state.listings],
                loading: false,
            };

        case START_AUCTION:
            return {
                ...state,
                listingDetails: {...state.listingDetails, status: "Listed"},
            };
        
        case USER_PURCHASED_LOADED:
            return {
                ...state,
                purchased: payload,
                purchaseLoading: false,
            };
        
        case LISTING_POSTED_BY_OTHER:
            return {
                ...state,
                listings: [payload, ...state.listings],
            };
        
        case UPDATE_LISTING_IN_LISTING_LIST:
            let updatedList = state.listings.map((listing) => {
                if (listing._id.toString() === payload._id.toString()) {
                    return payload;
                } else {
                    return listing;
                }
            } );
            return {
                ...state,
                listings: updatedList,
                loading: false,
            };
        
        case UPDATE_TIMER:
            if (state.listingDetails._id === payload._id) {
                return {
                    ...state,
                    listingDetails: {...state.listingDetails, timer: payload.timer},
                };
            } else {
                return {
                    ...state,
                };
            }
        
        default:
            return state;
    }
}
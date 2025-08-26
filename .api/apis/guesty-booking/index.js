"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'guesty-booking/1.0.1 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * This call returns the list of listings connected to the requester Booking Engine API
     * instance in Guesty and filtered by given parameters
     *
     * @summary Get all the listings included in the booking engine
     * @throws FetchError<400, types.GetApplicationListingsListResponse400> Bad request
     * @throws FetchError<401, types.GetApplicationListingsListResponse401> Not authorized
     * @throws FetchError<429, types.GetApplicationListingsListResponse429> Too many requests
     */
    SDK.prototype.getApplicationListingsList = function (metadata) {
        return this.core.fetch('/api/listings', 'get', metadata);
    };
    /**
     * This call returns a listing by ID
     *
     * @summary Get a specific listing
     * @throws FetchError<400, types.GetApplicationListingResponse400> Bad request
     * @throws FetchError<401, types.GetApplicationListingResponse401> Not authorized
     * @throws FetchError<403, types.GetApplicationListingResponse403> Forbidden
     * @throws FetchError<429, types.GetApplicationListingResponse429> Too many requests
     */
    SDK.prototype.getApplicationListing = function (metadata) {
        return this.core.fetch('/api/listings/{listingId}', 'get', metadata);
    };
    /**
     * Get a list of listings according to their availability on selected dates.
     * ## Deprecation notice:
     *    **This endpoint will be deprecated in the next months. We suggest using 'Get
     * listings' endpoint instead (you won't have any capability missing) -
     * https://booking-api-docs.guesty.com/reference/getapplicationlistingslist**
     *
     * @summary Get listings by availability
     * @throws FetchError<400, types.GetAvailableListingsResponse400> Bad request
     * @throws FetchError<401, types.GetAvailableListingsResponse401> Not authorized
     * @throws FetchError<429, types.GetAvailableListingsResponse429> Too many requests
     */
    SDK.prototype.getAvailableListings = function (metadata) {
        return this.core.fetch('/api/listings/availability', 'get', metadata);
    };
    /**
     * Returns a list of all the cities countries and states related to the booking engine
     * listings
     *
     * @summary Get list of cities
     * @throws FetchError<400, types.GetCitiesResponse400> Bad request
     * @throws FetchError<401, types.GetCitiesResponse401> Not authorized
     * @throws FetchError<429, types.GetCitiesResponse429> Too many requests
     */
    SDK.prototype.getCities = function (metadata) {
        return this.core.fetch('/api/listings/cities', 'get', metadata);
    };
    /**
     * Return a listing calendar for period
     *
     * @summary Get listing availability calendar
     * @throws FetchError<400, types.GetCalendarByListingIdResponse400> Bad request
     * @throws FetchError<401, types.GetCalendarByListingIdResponse401> Not authorized
     * @throws FetchError<403, types.GetCalendarByListingIdResponse403> Forbidden
     * @throws FetchError<429, types.GetCalendarByListingIdResponse429> Too many requests
     */
    SDK.prototype.getCalendarByListingId = function (metadata) {
        return this.core.fetch('/api/listings/{listingId}/calendar', 'get', metadata);
    };
    /**
     * Return a payment provider
     *
     * @summary Get listing's payment provider
     * @throws FetchError<400, types.GetPaymentProviderByListingIdResponse400> Bad request
     * @throws FetchError<401, types.GetPaymentProviderByListingIdResponse401> Not authorized
     * @throws FetchError<403, types.GetPaymentProviderByListingIdResponse403> Forbidden
     * @throws FetchError<429, types.GetPaymentProviderByListingIdResponse429> Too many requests
     */
    SDK.prototype.getPaymentProviderByListingId = function (metadata) {
        return this.core.fetch('/api/listings/{listingId}/payment-provider', 'get', metadata);
    };
    /**
     * Create a reservation. Pre-SCA Stripe tokens (starting with `tok_...`) are NOT SUPPORTED.
     * The API supports only Stripe SCA tokens (starting with `pm_...`)
     * ## Deprecation notice:
     *    **This endpoint will be deprecated in the next months. We recommend to use
     * ‘Reservation quote’ endpoints instead.**
     *
     * @summary Create a reservation
     * @throws FetchError<400, types.CreateRerservationResponse400> Bad request
     * @throws FetchError<401, types.CreateRerservationResponse401> Not authorized
     * @throws FetchError<403, types.CreateRerservationResponse403> Forbidden
     * @throws FetchError<429, types.CreateRerservationResponse429> Too many requests
     */
    SDK.prototype.createRerservation = function (body) {
        return this.core.fetch('/api/reservations', 'post', body);
    };
    /**
     * Calculate and and get full price breakdown for a specific reservation details
     * ## Deprecation notice:
     *    **This endpoint will be deprecated in the next months. We recommend to use
     * ‘Reservation quote’ endpoints instead.**
     *
     * @summary Get precalculated reservation price breakdown
     * @throws FetchError<400, types.CalculateReservationMoneyResponse400> Bad request
     * @throws FetchError<401, types.CalculateReservationMoneyResponse401> Not authorized
     * @throws FetchError<403, types.CalculateReservationMoneyResponse403> Forbidden
     * @throws FetchError<429, types.CalculateReservationMoneyResponse429> Too many requests
     */
    SDK.prototype.calculateReservationMoney = function (metadata) {
        return this.core.fetch('/api/reservations/money', 'get', metadata);
    };
    /**
     * This call returns the reservation by ID
     * ## Deprecation notice:
     *    **This endpoint will be deprecated in the next months. We recommend to use
     * ‘Reservation quote’ endpoints instead.**
     *
     * @summary Get booking engine reservation by Id
     * @throws FetchError<400, types.GetApplicationReservationResponse400> Bad request
     * @throws FetchError<401, types.GetApplicationReservationResponse401> Not authorized
     * @throws FetchError<429, types.GetApplicationReservationResponse429> Too many requests
     */
    SDK.prototype.getApplicationReservation = function (metadata) {
        return this.core.fetch('/api/reservations/{reservationId}', 'get', metadata);
    };
    /**
     * Create a reservation quote to hold booking offer for certain period of time. A
     * “default”/”standard” rate plan is supplied for properties that aren’t assigned to an
     * active [Revenue Management Rate
     * Plan](https://help.guesty.com/hc/en-gb/articles/9364117776541-Rate-plans-Overview).
     * Ensure you only use the rate plans supplied with the quote to create your reservation.
     * > ❗ Important
     * >
     * > Before using the Booking Engine (BE) API reservation endpoints, ensure your Guesty
     * account is properly activated by following these steps:
     * > 1. Activate Manual Source (skip this step if you already have direct reservations in
     * Guesty account):
     * >    - Create a manual reservation directly in the Guesty UI. This step is required to
     * activate the "Manual" booking source in your account.
     * > 2. Activate BE API Source:
     * >    - Create your first reservation using the Booking Engine API endpoints.
     * >    - This step is essential to initialize the BE API source, which allows you to set
     * up additional fees, taxes, auto payments and automated messages.
     *
     * @summary Create a reservation quote
     * @throws FetchError<400, types.CreateReservationQuoteResponse400> Bad request
     * @throws FetchError<401, types.CreateReservationQuoteResponse401> Not authorized
     * @throws FetchError<403, types.CreateReservationQuoteResponse403> Forbidden
     * @throws FetchError<429, types.CreateReservationQuoteResponse429> Too many requests
     */
    SDK.prototype.createReservationQuote = function (body) {
        return this.core.fetch('/api/reservations/quotes', 'post', body);
    };
    /**
     * Retrieve a quote by ID.
     *
     * @summary Retrieve a quote
     * @throws FetchError<400, types.RetrieveQuoteByIdResponse400> Bad request
     * @throws FetchError<401, types.RetrieveQuoteByIdResponse401> Not authorized
     * @throws FetchError<403, types.RetrieveQuoteByIdResponse403> Forbidden
     * @throws FetchError<429, types.RetrieveQuoteByIdResponse429> Too many requests
     */
    SDK.prototype.retrieveQuoteById = function (metadata) {
        return this.core.fetch('/api/reservations/quotes/{quoteId}', 'get', metadata);
    };
    SDK.prototype.manageRatePlanQuoteCoupons = function (body, metadata) {
        return this.core.fetch('/api/reservations/quotes/{quoteId}/coupons', 'post', body, metadata);
    };
    /**
     * Create instant reservation based on quote to use the same data which the quote holds.
     * Pre-SCA Stripe tokens (starting with `tok_...`) are NOT SUPPORTED. The API supports only
     * Stripe SCA tokens (starting with `pm_...`).
     * > ❗ Important
     * >
     * > Before using the Booking Engine (BE) API reservation endpoints, ensure your Guesty
     * account is properly activated by following these steps:
     * > 1. Activate Manual Source (skip this step if you already have direct reservations in
     * Guesty account):
     * >    - Create a manual reservation directly in the Guesty UI. This step is required to
     * activate the "Manual" booking source in your account.
     * > 2. Activate BE API Source:
     * >    - Create your first reservation using the Booking Engine API endpoints.
     * >    - This step is essential to initialize the BE API source, which allows you to set
     * up additional fees, taxes, auto payments and automated messages.
     *
     * @summary Create instant reservation based on quote
     * @throws FetchError<400, types.CreateInstantReservationFromQuoteResponse400> Bad request
     * @throws FetchError<401, types.CreateInstantReservationFromQuoteResponse401> Not authorized
     * @throws FetchError<403, types.CreateInstantReservationFromQuoteResponse403> Forbidden
     * @throws FetchError<429, types.CreateInstantReservationFromQuoteResponse429> Too many requests
     */
    SDK.prototype.createInstantReservationFromQuote = function (body, metadata) {
        return this.core.fetch('/api/reservations/quotes/{quoteId}/instant', 'post', body, metadata);
    };
    /**
     * Create a request for a reservation to be confirmed by the Guesty user based on a quote.
     * Pre-SCA Stripe tokens (starting with `tok_...`) are NOT SUPPORTED. The API supports only
     * Stripe SCA tokens (starting with `pm_...`).
     * > ❗ Important
     * >
     * > Before using the Booking Engine (BE) API reservation endpoints, ensure your Guesty
     * account is properly activated by following these steps:
     * > 1. Activate Manual Source (skip this step if you already have direct reservations in
     * Guesty account):
     * >    - Create a manual reservation directly in the Guesty UI. This step is required to
     * activate the "Manual" booking source in your account.
     * > 2. Activate BE API Source:
     * >    - Create your first reservation using the Booking Engine API endpoints.
     * >    - This step is essential to initialize the BE API source, which allows you to set
     * up additional fees, taxes, auto payments and automated messages.
     *
     * @summary Create inquiry for reservation based on quote
     * @throws FetchError<400, types.CreateInquiryReservationFromQuoteResponse400> Bad request
     * @throws FetchError<401, types.CreateInquiryReservationFromQuoteResponse401> Not authorized
     * @throws FetchError<403, types.CreateInquiryReservationFromQuoteResponse403> Forbidden
     * @throws FetchError<429, types.CreateInquiryReservationFromQuoteResponse429> Too many requests
     */
    SDK.prototype.createInquiryReservationFromQuote = function (body, metadata) {
        return this.core.fetch('/api/reservations/quotes/{quoteId}/inquiry', 'post', body, metadata);
    };
    /**
     * Retrieve a reservation created with quote by ID
     *
     * @summary Retrieve a reservation by ID
     * @throws FetchError<400, types.GetQuoteReservationByIdResponse400> Bad request
     * @throws FetchError<401, types.GetQuoteReservationByIdResponse401> Not authorized
     * @throws FetchError<403, types.GetQuoteReservationByIdResponse403> Forbidden
     * @throws FetchError<429, types.GetQuoteReservationByIdResponse429> Too many requests
     */
    SDK.prototype.getQuoteReservationById = function (metadata) {
        return this.core.fetch('/api/reservations/{reservationId}/details', 'get', metadata);
    };
    /**
     * Get reviews list by parameters
     *
     * @summary Retrieve reviews
     * @throws FetchError<400, types.GetReviewsListResponse400> Bad request
     * @throws FetchError<401, types.GetReviewsListResponse401> Not authorized
     * @throws FetchError<403, types.GetReviewsListResponse403> Forbidden
     * @throws FetchError<429, types.GetReviewsListResponse429> Too many requests
     */
    SDK.prototype.getReviewsList = function (metadata) {
        return this.core.fetch('/api/reviews', 'get', metadata);
    };
    /**
     * This call returns the list of upsell fee available to the requester listing in quote
     * [Pilot]
     *
     * @summary Retrieve upsell [Pilot]
     * @throws FetchError<400, types.RetrieveUpsellFeeResponse400> Bad request
     * @throws FetchError<401, types.RetrieveUpsellFeeResponse401> Not authorized
     * @throws FetchError<429, types.RetrieveUpsellFeeResponse429> Too many requests
     */
    SDK.prototype.retrieveUpsellFee = function (metadata) {
        return this.core.fetch('/api/reservations/upsell/{quoteId}/{listingId}/fee', 'get', metadata);
    };
    SDK.prototype.replaceUpsellFees = function (body, metadata) {
        return this.core.fetch('/api/reservations/upsell/{inquiryId}', 'post', body, metadata);
    };
    /**
     * Upsert metasearch config
     *
     * @summary Upsert metasearch config
     * @throws FetchError<400, types.UpsertMetasearchConfigResponse400> Bad request
     * @throws FetchError<401, types.UpsertMetasearchConfigResponse401> Not authorized
     * @throws FetchError<429, types.UpsertMetasearchConfigResponse429> Too many requests
     */
    SDK.prototype.upsertMetasearchConfig = function (body, metadata) {
        return this.core.fetch('/api/metasearch/pointofsale/{pointofsale}/config', 'put', body, metadata);
    };
    /**
     * Get metasearch config
     *
     * @summary Get metasearch config
     * @throws FetchError<400, types.GetMetasearchConfigResponse400> Bad request
     * @throws FetchError<401, types.GetMetasearchConfigResponse401> Not authorized
     * @throws FetchError<429, types.GetMetasearchConfigResponse429> Too many requests
     */
    SDK.prototype.getMetasearchConfig = function (metadata) {
        return this.core.fetch('/api/metasearch/pointofsale/{pointofsale}/config', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;

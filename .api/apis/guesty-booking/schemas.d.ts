declare const CalculateReservationMoney: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly listingId: {
                    readonly type: "string";
                    readonly examples: readonly ["5bf544a600a9b000389f81d8"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "listingId";
                };
                readonly checkIn: {
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                    readonly examples: readonly ["2021-12-15"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkIn";
                };
                readonly checkOut: {
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                    readonly examples: readonly ["2021-12-20"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkOut";
                };
                readonly guestsCount: {
                    readonly type: "integer";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "number of guests";
                };
                readonly coupon: {
                    readonly type: "string";
                    readonly examples: readonly ["DISCOUNT_50_OFF"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "coupon code";
                };
            };
            readonly required: readonly ["listingId", "checkIn", "checkOut", "guestsCount"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly money: {
                    readonly type: "object";
                    readonly properties: {
                        readonly autoPaymentsPolicy: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly _id: {
                                        readonly type: "string";
                                    };
                                    readonly useGuestCard: {
                                        readonly type: "boolean";
                                    };
                                    readonly amount: {
                                        readonly type: "number";
                                    };
                                    readonly chargeType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["REST_OF_PAYMENT", "PERCENTAGE", "FIXED"];
                                        readonly description: "`REST_OF_PAYMENT` `PERCENTAGE` `FIXED`";
                                    };
                                    readonly isAuthorizationHold: {
                                        readonly type: "boolean";
                                    };
                                    readonly scheduleTo: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly reservationEvent: {
                                                readonly type: "string";
                                                readonly enum: readonly ["CHECK_IN", "CHECK_OUT", "CONFIRMATION"];
                                                readonly description: "`CHECK_IN` `CHECK_OUT` `CONFIRMATION`";
                                            };
                                            readonly timeRelation: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly relation: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["AT", "BEFORE", "AFTER"];
                                                        readonly description: "`AT` `BEFORE` `AFTER`";
                                                    };
                                                    readonly unit: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["SECONDS", "MINUTES", "HOURS", "DAYS"];
                                                        readonly description: "`SECONDS` `MINUTES` `HOURS` `DAYS`";
                                                    };
                                                    readonly amount: {
                                                        readonly type: "number";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly balanceDue: {
                            readonly type: "number";
                        };
                        readonly commission: {
                            readonly type: "number";
                        };
                        readonly commissionFormula: {
                            readonly type: "string";
                        };
                        readonly commissionIncTax: {
                            readonly type: "number";
                        };
                        readonly commissionTax: {
                            readonly type: "number";
                        };
                        readonly commissionTaxPercentage: {
                            readonly type: "number";
                        };
                        readonly currency: {
                            readonly type: "string";
                            readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                            readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                        };
                        readonly fareAccommodation: {
                            readonly type: "number";
                        };
                        readonly fareAccommodationAdjusted: {
                            readonly type: "number";
                        };
                        readonly fareAccommodationAdjustment: {
                            readonly type: "number";
                        };
                        readonly fareAccommodationDiscount: {
                            readonly type: "number";
                        };
                        readonly fareCleaning: {
                            readonly type: "number";
                        };
                        readonly hostPayout: {
                            readonly type: "number";
                        };
                        readonly hostPayoutUsd: {
                            readonly type: "number";
                        };
                        readonly hostServiceFee: {
                            readonly type: "number";
                        };
                        readonly hostServiceFeeIncTax: {
                            readonly type: "number";
                        };
                        readonly hostServiceFeeTax: {
                            readonly type: "number";
                        };
                        readonly invoiceItems: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly title: {
                                        readonly type: "string";
                                    };
                                    readonly amount: {
                                        readonly type: "number";
                                    };
                                    readonly currency: {
                                        readonly type: "string";
                                        readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                        readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                    };
                                    readonly isLocked: {
                                        readonly type: "boolean";
                                    };
                                    readonly normalType: {
                                        readonly type: "string";
                                    };
                                    readonly isTax: {
                                        readonly type: "boolean";
                                    };
                                    readonly metadata: {
                                        readonly type: "object";
                                        readonly additionalProperties: true;
                                    };
                                };
                            };
                        };
                        readonly netIncome: {
                            readonly type: "number";
                        };
                        readonly netIncomeFormula: {
                            readonly type: "string";
                        };
                        readonly ownerRevenue: {
                            readonly type: "number";
                        };
                        readonly ownerRevenueFormula: {
                            readonly type: "string";
                        };
                        readonly payments: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly policyItemId: {
                                        readonly type: "string";
                                    };
                                    readonly shouldBePaidAt: {
                                        readonly type: "string";
                                    };
                                    readonly status: {
                                        readonly type: "string";
                                    };
                                    readonly currency: {
                                        readonly type: "string";
                                        readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                        readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                    };
                                    readonly event: {
                                        readonly type: "string";
                                    };
                                    readonly isAuthorizationHold: {
                                        readonly type: "boolean";
                                    };
                                    readonly amount: {
                                        readonly type: "number";
                                    };
                                    readonly paymentMethodId: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly paymentsDue: {
                            readonly type: "number";
                        };
                        readonly subTotalPrice: {
                            readonly type: "number";
                        };
                        readonly useAccountRevenueShare: {
                            readonly type: "boolean";
                        };
                    };
                };
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly errors: {
                            readonly type: "array";
                            readonly description: "The reservation response can contain the list of errors when there were issues with finding or applying coupons.";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["COUPON_NOT_FOUND", "COUPON_IS_DISABLED", "COUPON_MAXIMUM_USES_EXCEEDED", "COUPON_EXPIRATION_DATE_EXCEEDED", "COUPON_MIN_NIGHT_MISMATCH", "UNEXPECTED_ERROR"];
                                readonly description: "`COUPON_NOT_FOUND` `COUPON_IS_DISABLED` `COUPON_MAXIMUM_USES_EXCEEDED` `COUPON_EXPIRATION_DATE_EXCEEDED` `COUPON_MIN_NIGHT_MISMATCH` `UNEXPECTED_ERROR`";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateInquiryReservationFromQuote: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["ratePlanId", "guest"];
        readonly properties: {
            readonly ratePlanId: {
                readonly type: "string";
                readonly description: "Rate plan ID. Ensure you supply one of the rate plan IDs returned in the quote payload. Attempts to use any other string will result in an error.";
                readonly examples: readonly ["5bf544a600a9b000389f81d8"];
            };
            readonly ccToken: {
                readonly type: "string";
                readonly description: "payment token id, see tokenization guide https://booking-api-docs.guesty.com/docs/tokenizing-payment-methods";
                readonly examples: readonly ["pm_1KTRn22eZvKYlo2CkHIARaGo"];
            };
            readonly guest: {
                readonly type: "object";
                readonly required: readonly ["firstName", "lastName", "email"];
                readonly properties: {
                    readonly firstName: {
                        readonly type: "string";
                        readonly description: "Name of the guest";
                        readonly examples: readonly ["Jhon"];
                    };
                    readonly lastName: {
                        readonly type: "string";
                        readonly description: "Surname of the guest";
                        readonly examples: readonly ["Dou"];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "Email of the guest";
                        readonly examples: readonly ["jhon.dou@guesty.com"];
                    };
                    readonly phone: {
                        readonly type: "string";
                        readonly description: "Phone number of the guest";
                        readonly examples: readonly ["380111111111"];
                    };
                    readonly address: {
                        readonly type: "object";
                        readonly properties: {
                            readonly street: {
                                readonly type: "string";
                                readonly examples: readonly ["1000 5th Ave"];
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly examples: readonly ["New York"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly examples: readonly ["United State"];
                            };
                            readonly countryCode: {
                                readonly type: "string";
                                readonly examples: readonly ["US"];
                            };
                            readonly zipCode: {
                                readonly type: "string";
                                readonly examples: readonly ["10028"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly examples: readonly ["New York"];
                            };
                        };
                    };
                };
            };
            readonly policy: {
                readonly type: "object";
                readonly properties: {
                    readonly privacy: {
                        readonly type: "object";
                        readonly properties: {
                            readonly version: {
                                readonly type: "number";
                                readonly examples: readonly [1];
                            };
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-09-11"];
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                    readonly termsAndConditions: {
                        readonly type: "object";
                        readonly properties: {
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-09-11"];
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                    readonly marketing: {
                        readonly type: "object";
                        readonly properties: {
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                };
            };
            readonly reservedUntil: {
                readonly type: "integer";
                readonly description: "Time in hours to reserve the reservation for. Use -1 to keep calendar reserved.";
                readonly default: -1;
                readonly examples: readonly ["-1 | 12 | 24 | 36 | 48 | 72"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly quoteId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of quote";
                };
            };
            readonly required: readonly ["quoteId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["_id", "status", "platform", "createdAt", "guestId"];
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                    readonly description: "ID of reservation";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["reserved"];
                    readonly description: "`reserved`";
                };
                readonly platform: {
                    readonly type: "string";
                    readonly enum: readonly ["direct"];
                    readonly description: "`direct`";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly examples: readonly ["11/7/2021, 3:57:29 PM"];
                };
                readonly guestId: {
                    readonly type: "string";
                    readonly examples: readonly ["5e384c9fc2700d002670b61b"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateInstantReservationFromQuote: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["ratePlanId", "ccToken", "guest"];
        readonly properties: {
            readonly ratePlanId: {
                readonly type: "string";
                readonly description: "Rate plan ID. Ensure you supply one of the rate plan IDs returned in the quote payload. Attempts to use any other string will result in an error.";
                readonly examples: readonly ["5bf544a600a9b000389f81d8"];
            };
            readonly ccToken: {
                readonly type: "string";
                readonly description: "payment token id, see tokenization guide https://booking-api-docs.guesty.com/docs/tokenizing-payment-methods";
                readonly examples: readonly ["pm_1KTRn22eZvKYlo2CkHIARaGo"];
            };
            readonly guest: {
                readonly type: "object";
                readonly required: readonly ["firstName", "lastName", "email"];
                readonly properties: {
                    readonly firstName: {
                        readonly type: "string";
                        readonly description: "Name of the guest";
                        readonly examples: readonly ["Jhon"];
                    };
                    readonly lastName: {
                        readonly type: "string";
                        readonly description: "Surname of the guest";
                        readonly examples: readonly ["Dou"];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "Email of the guest";
                        readonly examples: readonly ["jhon.dou@guesty.com"];
                    };
                    readonly phone: {
                        readonly type: "string";
                        readonly description: "Phone number of the guest";
                        readonly examples: readonly ["380111111111"];
                    };
                    readonly address: {
                        readonly type: "object";
                        readonly properties: {
                            readonly street: {
                                readonly type: "string";
                                readonly examples: readonly ["1000 5th Ave"];
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly examples: readonly ["New York"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly examples: readonly ["United State"];
                            };
                            readonly countryCode: {
                                readonly type: "string";
                                readonly examples: readonly ["US"];
                            };
                            readonly zipCode: {
                                readonly type: "string";
                                readonly examples: readonly ["10028"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly examples: readonly ["New York"];
                            };
                        };
                    };
                };
            };
            readonly policy: {
                readonly type: "object";
                readonly properties: {
                    readonly privacy: {
                        readonly type: "object";
                        readonly properties: {
                            readonly version: {
                                readonly type: "number";
                                readonly examples: readonly [1];
                            };
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-09-11"];
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                    readonly termsAndConditions: {
                        readonly type: "object";
                        readonly properties: {
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly examples: readonly ["2022-09-11"];
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                    readonly marketing: {
                        readonly type: "object";
                        readonly properties: {
                            readonly isAccepted: {
                                readonly type: "boolean";
                                readonly examples: readonly [true];
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly quoteId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of quote";
                };
            };
            readonly required: readonly ["quoteId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["_id", "status", "platform", "confirmationCode", "createdAt", "guestId"];
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                    readonly description: "ID of reservation";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["confirmed"];
                    readonly description: "`confirmed`";
                };
                readonly platform: {
                    readonly type: "string";
                    readonly enum: readonly ["direct"];
                    readonly description: "`direct`";
                };
                readonly confirmationCode: {
                    readonly type: "string";
                    readonly description: "reservation confirmation code";
                    readonly examples: readonly ["4FDJO39DG33"];
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly examples: readonly ["11/7/2021, 3:57:29 PM"];
                };
                readonly guestId: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateRerservation: {
    readonly body: {
        readonly properties: {
            readonly reservation: {
                readonly type: "object";
                readonly required: readonly ["listingId", "checkInDateLocalized", "checkOutDateLocalized", "guestsCount"];
                readonly properties: {
                    readonly coupon: {
                        readonly type: "string";
                    };
                    readonly listingId: {
                        readonly type: "string";
                    };
                    readonly checkInDateLocalized: {
                        readonly type: "string";
                        readonly format: "date";
                    };
                    readonly checkOutDateLocalized: {
                        readonly type: "string";
                        readonly format: "date";
                    };
                    readonly guestsCount: {
                        readonly type: "string";
                    };
                };
            };
            readonly guest: {
                readonly type: "object";
                readonly required: readonly ["firstName"];
                readonly properties: {
                    readonly firstName: {
                        readonly type: "string";
                    };
                    readonly lastName: {
                        readonly type: "string";
                    };
                    readonly email: {
                        readonly type: "string";
                    };
                    readonly phone: {
                        readonly type: "string";
                    };
                };
            };
            readonly policy: {
                readonly type: "object";
                readonly properties: {
                    readonly privacy: {
                        readonly type: "object";
                        readonly required: readonly ["version", "dateOfAcceptance", "isAccepted"];
                        readonly properties: {
                            readonly version: {
                                readonly type: "number";
                            };
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly termsAndConditions: {
                        readonly type: "object";
                        readonly required: readonly ["version", "dateOfAcceptance", "isAccepted"];
                        readonly properties: {
                            readonly version: {
                                readonly type: "number";
                            };
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly marketing: {
                        readonly type: "object";
                        readonly required: readonly ["dateOfAcceptance", "isAccepted"];
                        readonly properties: {
                            readonly dateOfAcceptance: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly isAccepted: {
                                readonly type: "boolean";
                            };
                        };
                    };
                };
            };
            readonly payment: {
                readonly type: "object";
                readonly properties: {
                    readonly token: {
                        readonly type: "string";
                        readonly description: "Id from stripe payment method (only SCA tokens are supported). More details https://stripe.com/docs/js/setup_intents/confirm_card_setup";
                        readonly examples: readonly ["pm_1KTRn22eZvKYlo2CkHIARaGo"];
                    };
                };
            };
        };
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["confirmed", "declined", "inquiry"];
                    readonly description: "`confirmed` `declined` `inquiry`";
                };
                readonly confirmationCode: {
                    readonly type: "string";
                };
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly description: "The reservation response can contain the list of errors when there were issues with finding or applying coupons.\n\n`COUPON_NOT_FOUND` `COUPON_IS_DISABLED` `COUPON_MAXIMUM_USES_EXCEEDED` `COUPON_EXPIRATION_DATE_EXCEEDED` `COUPON_MIN_NIGHT_MISMATCH` `COUPON_UNEXPECTED_ERROR` `MIN_NIGHT_MISMATCH` `LISTING_CALENDAR_BLOCKED`";
                        readonly enum: readonly ["COUPON_NOT_FOUND", "COUPON_IS_DISABLED", "COUPON_MAXIMUM_USES_EXCEEDED", "COUPON_EXPIRATION_DATE_EXCEEDED", "COUPON_MIN_NIGHT_MISMATCH", "COUPON_UNEXPECTED_ERROR", "MIN_NIGHT_MISMATCH", "LISTING_CALENDAR_BLOCKED"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateReservationQuote: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["checkInDateLocalized", "checkOutDateLocalized", "listingId", "guestsCount"];
        readonly properties: {
            readonly checkInDateLocalized: {
                readonly type: "string";
                readonly description: "Localized to listing timezone reservation checkin date";
                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                readonly examples: readonly ["2022-12-28"];
            };
            readonly checkOutDateLocalized: {
                readonly type: "string";
                readonly description: "Localized to listing timezone reservation checkout date";
                readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                readonly examples: readonly ["2023-01-15"];
            };
            readonly listingId: {
                readonly type: "string";
                readonly description: "Listing ID";
                readonly examples: readonly ["5bf544a600a9b000389f81d8"];
            };
            readonly guestsCount: {
                readonly type: "integer";
                readonly default: 1;
                readonly description: "Guests quantity";
                readonly examples: readonly [1];
            };
            readonly coupons: {
                readonly type: "string";
                readonly description: "The list of coupon codes joined by comma";
                readonly examples: readonly ["DISCOUNT_50_$,DISCOUNT_60_$"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["_id", "createdAt", "expiresAt", "promotions", "coupons", "rates"];
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                    readonly description: "This is a quote id for creating instant/inquiry reservation";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The quote was created at";
                };
                readonly expiresAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The quote will be expired at";
                };
                readonly promotions: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly adjustment: {
                            readonly type: "integer";
                        };
                    };
                };
                readonly coupons: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["percentage"];
                                readonly description: "`percentage`";
                            };
                            readonly code: {
                                readonly type: "string";
                            };
                            readonly adjustment: {
                                readonly type: "integer";
                            };
                        };
                    };
                    readonly description: "List of coupons applied for the reservation quote";
                };
                readonly rates: {
                    readonly type: "object";
                    readonly properties: {
                        readonly ratePlans: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly _id: {
                                        readonly type: "string";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                    };
                                    readonly mealPlans: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cancellationPolicy: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cancellationFee: {
                                        readonly type: "string";
                                    };
                                    readonly priceAdjustment: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                            };
                                            readonly direction: {
                                                readonly type: "string";
                                            };
                                            readonly amount: {
                                                readonly type: "number";
                                            };
                                        };
                                    };
                                    readonly days: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly date: {
                                                    readonly type: "string";
                                                    readonly format: "date";
                                                };
                                                readonly price: {
                                                    readonly type: "integer";
                                                };
                                                readonly currency: {
                                                    readonly type: "string";
                                                };
                                                readonly basePrice: {
                                                    readonly type: "integer";
                                                };
                                                readonly rateStrategy: {
                                                    readonly type: "integer";
                                                };
                                                readonly ratePlan: {
                                                    readonly type: "integer";
                                                };
                                                readonly lengthOfStay: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly money: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly invoiceItems: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly title: {
                                                            readonly type: "string";
                                                        };
                                                        readonly amount: {
                                                            readonly type: "number";
                                                        };
                                                        readonly currency: {
                                                            readonly type: "string";
                                                            readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                                            readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                                        };
                                                        readonly type: {
                                                            readonly type: "string";
                                                        };
                                                        readonly normalType: {
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly _id: {
                                                readonly type: "string";
                                            };
                                            readonly fareAccommodationAdjusted: {
                                                readonly type: "number";
                                            };
                                            readonly currency: {
                                                readonly type: "string";
                                                readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                                readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                            };
                                            readonly fareAccommodation: {
                                                readonly type: "number";
                                            };
                                            readonly fareCleaning: {
                                                readonly type: "number";
                                            };
                                            readonly totalFees: {
                                                readonly type: "number";
                                            };
                                            readonly subTotalPrice: {
                                                readonly type: "number";
                                            };
                                            readonly hostPayout: {
                                                readonly type: "number";
                                            };
                                            readonly hostPayoutUsd: {
                                                readonly type: "number";
                                            };
                                            readonly totalTaxes: {
                                                readonly type: "number";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly guestId: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApplicationListing: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly listingId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of listing";
                };
            };
            readonly required: readonly ["listingId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly fields: {
                    readonly type: "string";
                    readonly examples: readonly ["_id address.city title accommodates"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of the listing fields to return separated by spaces. The fields should be taken from Listing object definition. To include bed arrangements to a response, please add bedArrangements to the fields in query params.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly _id: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["SINGLE", "MTL"];
                            readonly description: "`SINGLE` `MTL`";
                        };
                        readonly propertyType: {
                            readonly type: "string";
                            readonly enum: readonly ["Apartment", "House", "Loft", "Boat", "Camper/RV", "Condominium", "Chalet", "Bed & Breakfast", "Villa", "Tent", "Other", "Cabin", "Townhouse", "Bungalow", "Hut", "Dorm", "Parking Space", "Plane", "Treehouse", "Yurt", "Tipi", "Igloo", "Earth House", "Island", "Cave", "Castle", "Studio"];
                            readonly description: "`Apartment` `House` `Loft` `Boat` `Camper/RV` `Condominium` `Chalet` `Bed & Breakfast` `Villa` `Tent` `Other` `Cabin` `Townhouse` `Bungalow` `Hut` `Dorm` `Parking Space` `Plane` `Treehouse` `Yurt` `Tipi` `Igloo` `Earth House` `Island` `Cave` `Castle` `Studio`";
                        };
                        readonly roomType: {
                            readonly type: "string";
                            readonly enum: readonly ["Private room", "Entire home/apt", "Shared room"];
                            readonly description: "`Private room` `Entire home/apt` `Shared room`";
                        };
                        readonly title: {
                            readonly type: "string";
                        };
                        readonly nickname: {
                            readonly type: "string";
                        };
                        readonly accommodates: {
                            readonly type: "integer";
                        };
                        readonly address: {
                            readonly type: "object";
                            readonly properties: {
                                readonly city: {
                                    readonly type: "string";
                                };
                                readonly country: {
                                    readonly type: "string";
                                };
                                readonly full: {
                                    readonly type: "string";
                                };
                                readonly lat: {
                                    readonly type: "number";
                                };
                                readonly lng: {
                                    readonly type: "number";
                                };
                                readonly state: {
                                    readonly type: "string";
                                };
                                readonly street: {
                                    readonly type: "string";
                                };
                                readonly neighborhood: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly timezone: {
                            readonly type: "string";
                        };
                        readonly amenities: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["Accessible-height bed", "Accessible-height toilet", "Air conditioning", "Babysitter recommendations", "Baby bath", "Baby monitor", "Bathtub", "BBQ grill", "Beach essentials", "Bed linens", "Breakfast", "Cable TV", "Carbon monoxide detector", "Cat(s)", "Changing table", "Children's books and toys", "Children's dinnerware", "Cleaning before checkout", "Coffee maker", "Communal pool", "Cooking basics", "Crib", "Disabled parking spot", "Dishes and silverware", "Dishwasher", "Dog(s)", "Doorman", "Dryer", "Elevator in building", "Essentials", "Ethernet connection", "EV charger", "Extra pillows and blankets", "Fireplace guards", "Fire extinguisher", "Firm mattress", "First aid kit", "Flat smooth pathway to front door", "Free parking on premises", "Game console", "Garden or backyard", "Grab-rails for shower and toilet", "Gym", "Hair dryer", "Hangers", "Heating", "High chair", "Hot tub", "Hot water", "Indoor fireplace", "Indoor pool", "Internet", "Iron", "Kitchen", "Laptop friendly workspace", "Long term stays allowed", "Luggage dropoff allowed", "Microwave", "Other pet(s)", "Outdoor pool", "Outlet covers", "Oven", "Pack 'n Play/travel crib", "Path to entrance lit at night", "Patio or balcony", "Pets allowed", "Pets live on this property", "Pocket wifi", "Private entrance", "Private pool", "Refrigerator", "Roll-in shower with shower bench or chair", "Room-darkening shades", "Shampoo", "Single level home", "Smoke detector", "Smoking allowed", "Stair gates", "Step-free access", "Stove", "Suitable for children (2-12 years)", "Suitable for infants (under 2 years)", "Swimming pool", "Table corner guards", "Tub with shower bench", "TV", "Washer", "Wide clearance to bed", "Wide clearance to shower and toilet", "Wide doorway", "Wide hallway clearance", "Window guards", "Wireless Internet"];
                                readonly description: "`Accessible-height bed` `Accessible-height toilet` `Air conditioning` `Babysitter recommendations` `Baby bath` `Baby monitor` `Bathtub` `BBQ grill` `Beach essentials` `Bed linens` `Breakfast` `Cable TV` `Carbon monoxide detector` `Cat(s)` `Changing table` `Children's books and toys` `Children's dinnerware` `Cleaning before checkout` `Coffee maker` `Communal pool` `Cooking basics` `Crib` `Disabled parking spot` `Dishes and silverware` `Dishwasher` `Dog(s)` `Doorman` `Dryer` `Elevator in building` `Essentials` `Ethernet connection` `EV charger` `Extra pillows and blankets` `Fireplace guards` `Fire extinguisher` `Firm mattress` `First aid kit` `Flat smooth pathway to front door` `Free parking on premises` `Game console` `Garden or backyard` `Grab-rails for shower and toilet` `Gym` `Hair dryer` `Hangers` `Heating` `High chair` `Hot tub` `Hot water` `Indoor fireplace` `Indoor pool` `Internet` `Iron` `Kitchen` `Laptop friendly workspace` `Long term stays allowed` `Luggage dropoff allowed` `Microwave` `Other pet(s)` `Outdoor pool` `Outlet covers` `Oven` `Pack 'n Play/travel crib` `Path to entrance lit at night` `Patio or balcony` `Pets allowed` `Pets live on this property` `Pocket wifi` `Private entrance` `Private pool` `Refrigerator` `Roll-in shower with shower bench or chair` `Room-darkening shades` `Shampoo` `Single level home` `Smoke detector` `Smoking allowed` `Stair gates` `Step-free access` `Stove` `Suitable for children (2-12 years)` `Suitable for infants (under 2 years)` `Swimming pool` `Table corner guards` `Tub with shower bench` `TV` `Washer` `Wide clearance to bed` `Wide clearance to shower and toilet` `Wide doorway` `Wide hallway clearance` `Window guards` `Wireless Internet`";
                            };
                        };
                        readonly bathrooms: {
                            readonly type: "integer";
                        };
                        readonly bedrooms: {
                            readonly type: "integer";
                        };
                        readonly beds: {
                            readonly type: "integer";
                        };
                        readonly bedType: {
                            readonly type: "string";
                        };
                        readonly defaultCheckInTime: {
                            readonly type: "string";
                        };
                        readonly defaultCheckOutTime: {
                            readonly type: "string";
                        };
                        readonly pictures: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly original: {
                                        readonly type: "string";
                                    };
                                    readonly large: {
                                        readonly type: "string";
                                    };
                                    readonly regular: {
                                        readonly type: "string";
                                    };
                                    readonly thumbnail: {
                                        readonly type: "string";
                                    };
                                    readonly caption: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly prices: {
                            readonly type: "object";
                            readonly properties: {
                                readonly basePrice: {
                                    readonly type: "number";
                                    readonly examples: readonly [1];
                                };
                                readonly currency: {
                                    readonly type: "string";
                                    readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                    readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                };
                                readonly monthlyPriceFactor: {
                                    readonly type: "number";
                                };
                                readonly weeklyPriceFactor: {
                                    readonly type: "number";
                                };
                                readonly extraPersonFee: {
                                    readonly type: "number";
                                };
                                readonly cleaningFee: {
                                    readonly type: "number";
                                };
                                readonly petFee: {
                                    readonly type: "number";
                                };
                            };
                        };
                        readonly publicDescription: {
                            readonly type: "object";
                            readonly properties: {
                                readonly guestControls: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly allowsChildren: {
                                            readonly type: "boolean";
                                        };
                                        readonly allowsInfants: {
                                            readonly type: "boolean";
                                        };
                                        readonly allowsPets: {
                                            readonly type: "boolean";
                                        };
                                        readonly allowsSmoking: {
                                            readonly type: "boolean";
                                        };
                                        readonly allowsEvents: {
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly space: {
                                    readonly type: "string";
                                };
                                readonly access: {
                                    readonly type: "string";
                                };
                                readonly neighborhood: {
                                    readonly type: "string";
                                };
                                readonly transit: {
                                    readonly type: "string";
                                };
                                readonly notes: {
                                    readonly type: "string";
                                };
                                readonly interactionWithGuests: {
                                    readonly type: "string";
                                };
                                readonly summary: {
                                    readonly type: "string";
                                };
                                readonly houseRules: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly terms: {
                            readonly type: "object";
                            readonly properties: {
                                readonly minNights: {
                                    readonly type: "integer";
                                };
                                readonly maxNights: {
                                    readonly type: "integer";
                                };
                                readonly cancellation: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly taxes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly _id: {
                                        readonly type: "string";
                                    };
                                    readonly amount: {
                                        readonly type: "number";
                                    };
                                    readonly appliedToAllFees: {
                                        readonly type: "boolean";
                                    };
                                    readonly appliedOnFees: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                            readonly enum: readonly ["ADDITIONAL_BED", "AF", "AIR_CONDITIONING", "BABY_BED", "CAR_RENTAL", "CF", "CLUB_CARD", "COMMUNITY", "CONCIERGE", "EARLY_CHECKOUT", "LATE_CHECK_IN"];
                                            readonly description: "`ADDITIONAL_BED` `AF` `AIR_CONDITIONING` `BABY_BED` `CAR_RENTAL` `CF` `CLUB_CARD` `COMMUNITY` `CONCIERGE` `EARLY_CHECKOUT` `LATE_CHECK_IN`";
                                        };
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly quantifier: {
                                        readonly type: "string";
                                        readonly enum: readonly ["PER_NIGHT", "PER_GUEST", "PER_GUEST_PER_NIGHT", "PER_STAY"];
                                        readonly description: "`PER_NIGHT` `PER_GUEST` `PER_GUEST_PER_NIGHT` `PER_STAY`";
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["LOCAL_TAX", "CITY_TAX", "VAT", "GOODS_AND_SERVICES_TAX", "TOURISM_TAX", "OTHER"];
                                        readonly description: "`LOCAL_TAX` `CITY_TAX` `VAT` `GOODS_AND_SERVICES_TAX` `TOURISM_TAX` `OTHER`";
                                    };
                                    readonly units: {
                                        readonly type: "string";
                                        readonly enum: readonly ["PERCENTAGE", "FIXED"];
                                        readonly description: "`PERCENTAGE` `FIXED`";
                                    };
                                };
                            };
                        };
                        readonly reviews: {
                            readonly type: "object";
                            readonly properties: {
                                readonly avg: {
                                    readonly type: "number";
                                    readonly minimum: 0;
                                    readonly maximum: 10;
                                    readonly examples: readonly [3.5];
                                };
                                readonly total: {
                                    readonly type: "number";
                                    readonly minimum: 0;
                                    readonly examples: readonly [15];
                                };
                            };
                        };
                        readonly tags: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly bedArrangements: {
                            readonly type: "object";
                            readonly description: "To include bed arrangements to a response, please add bedArrangements to the fields in query params";
                            readonly properties: {
                                readonly unitTypeId: {
                                    readonly type: "string";
                                    readonly pattern: "^[0-9a-fA-F]{24}$";
                                    readonly description: "unit type id";
                                };
                                readonly accountId: {
                                    readonly type: "string";
                                    readonly pattern: "^[0-9a-fA-F]{24}$";
                                    readonly description: "account id";
                                };
                                readonly bedrooms: {
                                    readonly type: "array";
                                    readonly description: "bedroom description";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly roomNumber: {
                                                readonly type: "number";
                                                readonly description: "value of room numbers";
                                                readonly "x-example": 1;
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "room name";
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                                readonly description: "room type\n\n`BEDROOM` `SHARED_SPACE`";
                                                readonly enum: readonly ["BEDROOM", "SHARED_SPACE"];
                                            };
                                            readonly beds: {
                                                readonly type: "object";
                                                readonly description: "beds description";
                                                readonly properties: {
                                                    readonly KING_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly QUEEN_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly DOUBLE_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly SINGLE_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly SOFA_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly AIR_MATTRESS: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly BUNK_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly FLOOR_MATTRESS: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly WATER_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly TODDLER_BED: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                    readonly CRIB: {
                                                        readonly type: "number";
                                                        readonly "x-example": 1;
                                                        readonly default: 0;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly bedroomsAllowed: {
                                    readonly type: "boolean";
                                };
                                readonly isDefaultBedArrangement: {
                                    readonly type: "boolean";
                                };
                                readonly bathrooms: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly BEDROOM: {
                                            readonly type: "number";
                                            readonly description: "value of bedroom numbers";
                                            readonly "x-example": 1;
                                        };
                                        readonly PRIVATE: {
                                            readonly type: "number";
                                            readonly description: "value of private numbers";
                                            readonly "x-example": 1;
                                        };
                                    };
                                    readonly description: "bathroom type";
                                };
                                readonly deleted: {
                                    readonly type: "boolean";
                                    readonly default: false;
                                };
                                readonly deletedAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                };
                            };
                            readonly required: readonly ["accountId", "unitTypeId", "deleted"];
                        };
                        readonly unitTypeHouseRules: {
                            readonly type: "object";
                            readonly properties: {
                                readonly unitTypeId: {
                                    readonly type: "string";
                                    readonly pattern: "^[0-9a-fA-F]{24}$";
                                    readonly description: "unit type id";
                                };
                                readonly houseRules: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly additionalRules: {
                                            readonly type: "string";
                                        };
                                        readonly petsAllowed: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly enabled: {
                                                    readonly type: "boolean";
                                                };
                                                readonly chargeType: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                        readonly quietBetween: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly enabled: {
                                                    readonly type: "boolean";
                                                };
                                                readonly hours: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly start: {
                                                            readonly type: "string";
                                                            readonly format: "date-time";
                                                        };
                                                        readonly end: {
                                                            readonly type: "string";
                                                            readonly format: "date-time";
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly smokingAllowed: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly enabled: {
                                                    readonly type: "boolean";
                                                };
                                            };
                                        };
                                        readonly suitableForEvents: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly enabled: {
                                                    readonly type: "boolean";
                                                };
                                            };
                                        };
                                        readonly childrenRules: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly suitableForChildren: {
                                                    readonly type: "boolean";
                                                };
                                                readonly suitableForInfants: {
                                                    readonly type: "boolean";
                                                };
                                                readonly reason: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                    readonly description: "house rules details";
                                };
                                readonly deleted: {
                                    readonly type: "boolean";
                                    readonly default: false;
                                };
                                readonly deletedAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                };
                            };
                            readonly required: readonly ["unitTypeId", "houseRules", "deleted"];
                        };
                        readonly autoPayments: {
                            readonly type: "object";
                            readonly properties: {
                                readonly policy: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly scheduleTo: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly reservationEvent: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["CHECK_IN", "CHECK_OUT", "CONFIRMATION"];
                                                        readonly description: "`CHECK_IN` `CHECK_OUT` `CONFIRMATION`";
                                                    };
                                                    readonly timeRelation: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly relation: {
                                                                readonly type: "string";
                                                                readonly enum: readonly ["AT", "BEFORE", "AFTER"];
                                                                readonly description: "`AT` `BEFORE` `AFTER`";
                                                            };
                                                            readonly unit: {
                                                                readonly type: "string";
                                                                readonly enum: readonly ["SECONDS", "MINUTES", "HOURS", "DAYS"];
                                                                readonly description: "`SECONDS` `MINUTES` `HOURS` `DAYS`";
                                                            };
                                                            readonly amount: {
                                                                readonly type: "number";
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly chargeAuthorizationHold: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly inUse: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly scheduleTo: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly reservationEvent: {
                                                                readonly type: "string";
                                                                readonly enum: readonly ["CHECK_IN", "CHECK_OUT", "CONFIRMATION"];
                                                                readonly description: "`CHECK_IN` `CHECK_OUT` `CONFIRMATION`";
                                                            };
                                                            readonly timeRelation: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly relation: {
                                                                        readonly type: "string";
                                                                        readonly enum: readonly ["AT", "BEFORE", "AFTER"];
                                                                        readonly description: "`AT` `BEFORE` `AFTER`";
                                                                    };
                                                                    readonly unit: {
                                                                        readonly type: "string";
                                                                        readonly enum: readonly ["SECONDS", "MINUTES", "HOURS", "DAYS"];
                                                                        readonly description: "`SECONDS` `MINUTES` `HOURS` `DAYS`";
                                                                    };
                                                                    readonly amount: {
                                                                        readonly type: "number";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly chargeType: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["REST_OF_PAYMENT", "PERCENTAGE", "FIXED"];
                                                        readonly description: "`REST_OF_PAYMENT` `PERCENTAGE` `FIXED`";
                                                    };
                                                    readonly amount: {
                                                        readonly type: "number";
                                                    };
                                                };
                                            };
                                            readonly releaseAuthorizationHold: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly inUse: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly scheduleTo: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly reservationEvent: {
                                                                readonly type: "string";
                                                                readonly enum: readonly ["CHECK_IN", "CHECK_OUT", "CONFIRMATION"];
                                                                readonly description: "`CHECK_IN` `CHECK_OUT` `CONFIRMATION`";
                                                            };
                                                            readonly timeRelation: {
                                                                readonly type: "object";
                                                                readonly properties: {
                                                                    readonly relation: {
                                                                        readonly type: "string";
                                                                        readonly enum: readonly ["AT", "BEFORE", "AFTER"];
                                                                        readonly description: "`AT` `BEFORE` `AFTER`";
                                                                    };
                                                                    readonly unit: {
                                                                        readonly type: "string";
                                                                        readonly enum: readonly ["SECONDS", "MINUTES", "HOURS", "DAYS"];
                                                                        readonly description: "`SECONDS` `MINUTES` `HOURS` `DAYS`";
                                                                    };
                                                                    readonly amount: {
                                                                        readonly type: "number";
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly chargeType: {
                                                        readonly type: "string";
                                                        readonly enum: readonly ["REST_OF_PAYMENT", "PERCENTAGE", "FIXED"];
                                                        readonly description: "`REST_OF_PAYMENT` `PERCENTAGE` `FIXED`";
                                                    };
                                                };
                                            };
                                            readonly chargeType: {
                                                readonly type: "string";
                                                readonly enum: readonly ["REST_OF_PAYMENT", "PERCENTAGE", "FIXED"];
                                                readonly description: "`REST_OF_PAYMENT` `PERCENTAGE` `FIXED`";
                                            };
                                            readonly amount: {
                                                readonly type: "number";
                                            };
                                            readonly useGuestCard: {
                                                readonly type: "boolean";
                                            };
                                            readonly isAuthorizationHold: {
                                                readonly type: "boolean";
                                            };
                                            readonly notifyIfHoldFails: {
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApplicationListingsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly minOccupancy: {
                    readonly type: "integer";
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum value of listing occupancy";
                };
                readonly numberOfBedrooms: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum amount of listing bedrooms";
                };
                readonly numberOfBathrooms: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum amount of listing bathrooms";
                };
                readonly propertyType: {
                    readonly type: "string";
                    readonly enum: readonly ["APARTMENT", "HOUSE", "LOFT", "BOAT", "CAMPER_RV", "CONDOMINIUM", "CHALET", "BED_Breakfast", "VILLA", "TENT", "OTHER", "CABIN", "TOWNHOUSE", "BUNGALOW", "HUT", "DORM", "PARKING_SPACE", "PLANE", "TREEHOUSE", "YURT", "TIPI", "IGLOO", "EARTH_HOUSE", "ISLAND", "CAVE", "CASTLE", "STUDIO"];
                    readonly examples: readonly ["APARTMENT"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing property type.";
                };
                readonly listingType: {
                    readonly type: "string";
                    readonly enum: readonly ["SINGLE", "MTL"];
                    readonly examples: readonly ["SINGLE"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing type.";
                };
                readonly roomType: {
                    readonly type: "string";
                    readonly examples: readonly ["PRIVATE_ROOM"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing room type. All values of roomType are defined in RoomTypesQueryParameter definition";
                };
                readonly minPrice: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly examples: readonly [10];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum value of listing price. If it provided, the response will have listings which price is great or equal. Should be passed with currency query parameter";
                };
                readonly maxPrice: {
                    readonly type: "number";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum value of listing price. If it provided, the response will have listings which price is less or equal. Should be passed with currency query parameter";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly examples: readonly ["EUR"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing price currency. Should be provided with minPrice query parameter";
                };
                readonly includeAmenities: {
                    readonly type: "string";
                    readonly examples: readonly ["PETS_ALLOWED,SMOKING_ALLOWED,SUITABLE_FOR_INFANTS,SUITABLE_FOR_CHILDREN"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing amenities separated by coma which should have listings. All values of amenities query parameters are defined in AmenitiesQueryParameter definition.";
                };
                readonly excludeAmenities: {
                    readonly type: "string";
                    readonly examples: readonly ["SMOKING_ALLOWED"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing amenities separated by coma which should not have listings. All values of amenities query parameters are defined in AmenitiesQueryParameter definition.";
                };
                readonly minLng: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly examples: readonly [24.052472];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum longitude";
                };
                readonly maxLng: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly examples: readonly [24.05687];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum longitude";
                };
                readonly minLat: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly examples: readonly [49.830034];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum latitude";
                };
                readonly maxLat: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly examples: readonly [49.8366506];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum latitude";
                };
                readonly city: {
                    readonly type: "string";
                    readonly examples: readonly ["Houston"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "City name from the listings address";
                };
                readonly country: {
                    readonly type: "string";
                    readonly examples: readonly ["United States"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Country name from the listings address";
                };
                readonly state: {
                    readonly type: "string";
                    readonly examples: readonly ["Texas"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "State name from the listings address";
                };
                readonly neighborhood: {
                    readonly type: "string";
                    readonly examples: readonly ["Harrisburg"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "neighborhood from the listings address";
                };
                readonly fields: {
                    readonly type: "string";
                    readonly examples: readonly ["_id address.city title accommodates reviews"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of the listing fields to return separated by spaces. The fields should be taken from Listing object definition. To include bed arrangements to a response, please add bedArrangements to the fields in query params.";
                };
                readonly checkIn: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-20"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkin day in format YYYY-MM-DD";
                };
                readonly checkOut: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-25"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkout day in format YYYY-MM-DD";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 20;
                    readonly examples: readonly [15];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of results within a subset. Default value is 20, max value is 100";
                };
                readonly tags: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["tags=kinesu&tags=ExtendedStay"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings with specific tag, can be used multiple times for and function";
                };
                readonly kingBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly queenBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly doubleBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly singleBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly sofaBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly airMattress: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly bunkBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly floorMattress: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly waterBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly toddlerBed: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly crib: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "one of bed types";
                };
                readonly petsAllowed: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings' unit type house rules";
                };
                readonly smokingAllowed: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings' unit type house rules";
                };
                readonly suitableForEvents: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings' unit type house rules";
                };
                readonly suitableForChildren: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings' unit type house rules";
                };
                readonly suitableForInfants: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit results to listings' unit type house rules";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly examples: readonly ["eyJuZXh0Q3Vyc29yIjp7Imxpc3RpbmdJZCI6IjYwOWQ2YWI0MjU5ZWQxMDAyZDFlYWRjYiJ9fQ=="];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Provide cursor received from the response to iterate over pages";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly _id: {
                                readonly type: "string";
                                readonly examples: readonly ["61f984538b908351a18d2c75"];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["SINGLE", "MTL"];
                                readonly description: "`SINGLE` `MTL`";
                            };
                            readonly propertyType: {
                                readonly type: "string";
                                readonly enum: readonly ["Apartment", "House", "Loft", "Boat", "Camper/RV", "Condominium", "Chalet", "Bed & Breakfast", "Villa", "Tent", "Other", "Cabin", "Townhouse", "Bungalow", "Hut", "Dorm", "Parking Space", "Plane", "Treehouse", "Yurt", "Tipi", "Igloo", "Earth House", "Island", "Cave", "Castle", "Studio"];
                                readonly description: "`Apartment` `House` `Loft` `Boat` `Camper/RV` `Condominium` `Chalet` `Bed & Breakfast` `Villa` `Tent` `Other` `Cabin` `Townhouse` `Bungalow` `Hut` `Dorm` `Parking Space` `Plane` `Treehouse` `Yurt` `Tipi` `Igloo` `Earth House` `Island` `Cave` `Castle` `Studio`";
                            };
                            readonly roomType: {
                                readonly type: "string";
                                readonly enum: readonly ["Private room", "Entire home/apt", "Shared room"];
                                readonly description: "`Private room` `Entire home/apt` `Shared room`";
                            };
                            readonly title: {
                                readonly type: "string";
                            };
                            readonly accommodates: {
                                readonly type: "integer";
                            };
                            readonly address: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly city: {
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly type: "string";
                                    };
                                    readonly full: {
                                        readonly type: "string";
                                    };
                                    readonly lat: {
                                        readonly type: "number";
                                    };
                                    readonly lng: {
                                        readonly type: "number";
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                    };
                                    readonly street: {
                                        readonly type: "string";
                                    };
                                    readonly neighborhood: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly timezone: {
                                readonly type: "string";
                            };
                            readonly amenities: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Accessible-height bed", "Accessible-height toilet", "Air conditioning", "Babysitter recommendations", "Baby bath", "Baby monitor", "Bathtub", "BBQ grill", "Beach essentials", "Bed linens", "Breakfast", "Cable TV", "Carbon monoxide detector", "Cat(s)", "Changing table", "Children's books and toys", "Children's dinnerware", "Cleaning before checkout", "Coffee maker", "Communal pool", "Cooking basics", "Crib", "Disabled parking spot", "Dishes and silverware", "Dishwasher", "Dog(s)", "Doorman", "Dryer", "Elevator in building", "Essentials", "Ethernet connection", "EV charger", "Extra pillows and blankets", "Fireplace guards", "Fire extinguisher", "Firm mattress", "First aid kit", "Flat smooth pathway to front door", "Free parking on premises", "Game console", "Garden or backyard", "Grab-rails for shower and toilet", "Gym", "Hair dryer", "Hangers", "Heating", "High chair", "Hot tub", "Hot water", "Indoor fireplace", "Indoor pool", "Internet", "Iron", "Kitchen", "Laptop friendly workspace", "Long term stays allowed", "Luggage dropoff allowed", "Microwave", "Other pet(s)", "Outdoor pool", "Outlet covers", "Oven", "Pack 'n Play/travel crib", "Path to entrance lit at night", "Patio or balcony", "Pets allowed", "Pets live on this property", "Pocket wifi", "Private entrance", "Private pool", "Refrigerator", "Roll-in shower with shower bench or chair", "Room-darkening shades", "Shampoo", "Single level home", "Smoke detector", "Smoking allowed", "Stair gates", "Step-free access", "Stove", "Suitable for children (2-12 years)", "Suitable for infants (under 2 years)", "Swimming pool", "Table corner guards", "Tub with shower bench", "TV", "Washer", "Wide clearance to bed", "Wide clearance to shower and toilet", "Wide doorway", "Wide hallway clearance", "Window guards", "Wireless Internet"];
                                    readonly description: "`Accessible-height bed` `Accessible-height toilet` `Air conditioning` `Babysitter recommendations` `Baby bath` `Baby monitor` `Bathtub` `BBQ grill` `Beach essentials` `Bed linens` `Breakfast` `Cable TV` `Carbon monoxide detector` `Cat(s)` `Changing table` `Children's books and toys` `Children's dinnerware` `Cleaning before checkout` `Coffee maker` `Communal pool` `Cooking basics` `Crib` `Disabled parking spot` `Dishes and silverware` `Dishwasher` `Dog(s)` `Doorman` `Dryer` `Elevator in building` `Essentials` `Ethernet connection` `EV charger` `Extra pillows and blankets` `Fireplace guards` `Fire extinguisher` `Firm mattress` `First aid kit` `Flat smooth pathway to front door` `Free parking on premises` `Game console` `Garden or backyard` `Grab-rails for shower and toilet` `Gym` `Hair dryer` `Hangers` `Heating` `High chair` `Hot tub` `Hot water` `Indoor fireplace` `Indoor pool` `Internet` `Iron` `Kitchen` `Laptop friendly workspace` `Long term stays allowed` `Luggage dropoff allowed` `Microwave` `Other pet(s)` `Outdoor pool` `Outlet covers` `Oven` `Pack 'n Play/travel crib` `Path to entrance lit at night` `Patio or balcony` `Pets allowed` `Pets live on this property` `Pocket wifi` `Private entrance` `Private pool` `Refrigerator` `Roll-in shower with shower bench or chair` `Room-darkening shades` `Shampoo` `Single level home` `Smoke detector` `Smoking allowed` `Stair gates` `Step-free access` `Stove` `Suitable for children (2-12 years)` `Suitable for infants (under 2 years)` `Swimming pool` `Table corner guards` `Tub with shower bench` `TV` `Washer` `Wide clearance to bed` `Wide clearance to shower and toilet` `Wide doorway` `Wide hallway clearance` `Window guards` `Wireless Internet`";
                                };
                            };
                            readonly bathrooms: {
                                readonly type: "integer";
                                readonly minimum: 0;
                                readonly examples: readonly [2];
                            };
                            readonly bedrooms: {
                                readonly type: "integer";
                                readonly minimum: 0;
                                readonly examples: readonly [2];
                            };
                            readonly beds: {
                                readonly type: "integer";
                                readonly minimum: 0;
                                readonly examples: readonly [2];
                            };
                            readonly picture: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly thumbnail: {
                                        readonly type: "string";
                                    };
                                    readonly regular: {
                                        readonly type: "string";
                                    };
                                    readonly large: {
                                        readonly type: "string";
                                    };
                                    readonly caption: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly pictures: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly original: {
                                            readonly type: "string";
                                        };
                                        readonly large: {
                                            readonly type: "string";
                                        };
                                        readonly regular: {
                                            readonly type: "string";
                                        };
                                        readonly thumbnail: {
                                            readonly type: "string";
                                        };
                                        readonly caption: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly prices: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly basePrice: {
                                        readonly type: "number";
                                        readonly examples: readonly [1];
                                    };
                                    readonly currency: {
                                        readonly type: "string";
                                        readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                        readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                    };
                                    readonly monthlyPriceFactor: {
                                        readonly type: "number";
                                    };
                                    readonly weeklyPriceFactor: {
                                        readonly type: "number";
                                    };
                                    readonly extraPersonFee: {
                                        readonly type: "number";
                                    };
                                    readonly cleaningFee: {
                                        readonly type: "number";
                                    };
                                    readonly petFee: {
                                        readonly type: "number";
                                    };
                                };
                            };
                            readonly publicDescription: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly summary: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly allotment: {
                                readonly type: "object";
                                readonly description: "Depends on checkIn and checkOut";
                                readonly additionalProperties: true;
                            };
                            readonly nightlyRates: {
                                readonly type: "object";
                                readonly description: "Depends on checkIn and checkOut";
                                readonly additionalProperties: true;
                            };
                            readonly reviews: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly avg: {
                                        readonly type: "number";
                                        readonly minimum: 0;
                                        readonly maximum: 10;
                                        readonly examples: readonly [10];
                                    };
                                    readonly total: {
                                        readonly type: "number";
                                        readonly minimum: 0;
                                        readonly examples: readonly [2];
                                    };
                                };
                            };
                            readonly tags: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["kinesu", "ExtendedStay"];
                            };
                            readonly bedArrangements: {
                                readonly type: "object";
                                readonly description: "To include bed arrangements to a response, please add bedArrangements to the fields in query params";
                                readonly properties: {
                                    readonly unitTypeId: {
                                        readonly type: "string";
                                        readonly pattern: "^[0-9a-fA-F]{24}$";
                                        readonly description: "unit type id";
                                    };
                                    readonly accountId: {
                                        readonly type: "string";
                                        readonly pattern: "^[0-9a-fA-F]{24}$";
                                        readonly description: "account id";
                                    };
                                    readonly bedrooms: {
                                        readonly type: "array";
                                        readonly description: "bedroom description";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly roomNumber: {
                                                    readonly type: "number";
                                                    readonly description: "value of room numbers";
                                                    readonly "x-example": 1;
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "room name";
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly description: "room type\n\n`BEDROOM` `SHARED_SPACE`";
                                                    readonly enum: readonly ["BEDROOM", "SHARED_SPACE"];
                                                };
                                                readonly beds: {
                                                    readonly type: "object";
                                                    readonly description: "beds description";
                                                    readonly properties: {
                                                        readonly KING_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly QUEEN_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly DOUBLE_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly SINGLE_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly SOFA_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly AIR_MATTRESS: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly BUNK_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly FLOOR_MATTRESS: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly WATER_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly TODDLER_BED: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                        readonly CRIB: {
                                                            readonly type: "number";
                                                            readonly "x-example": 1;
                                                            readonly default: 0;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                    readonly bedroomsAllowed: {
                                        readonly type: "boolean";
                                    };
                                    readonly isDefaultBedArrangement: {
                                        readonly type: "boolean";
                                    };
                                    readonly bathrooms: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly BEDROOM: {
                                                readonly type: "number";
                                                readonly description: "value of bedroom numbers";
                                                readonly "x-example": 1;
                                            };
                                            readonly PRIVATE: {
                                                readonly type: "number";
                                                readonly description: "value of private numbers";
                                                readonly "x-example": 1;
                                            };
                                        };
                                        readonly description: "bathroom type";
                                    };
                                    readonly deleted: {
                                        readonly type: "boolean";
                                        readonly default: false;
                                    };
                                    readonly deletedAt: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                };
                                readonly required: readonly ["accountId", "unitTypeId", "deleted"];
                            };
                            readonly unitTypeHouseRules: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly unitTypeId: {
                                        readonly type: "string";
                                        readonly pattern: "^[0-9a-fA-F]{24}$";
                                        readonly description: "unit type id";
                                    };
                                    readonly houseRules: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly additionalRules: {
                                                readonly type: "string";
                                            };
                                            readonly petsAllowed: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly enabled: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly chargeType: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                            readonly quietBetween: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly enabled: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly hours: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly start: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                            };
                                                            readonly end: {
                                                                readonly type: "string";
                                                                readonly format: "date-time";
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly smokingAllowed: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly enabled: {
                                                        readonly type: "boolean";
                                                    };
                                                };
                                            };
                                            readonly suitableForEvents: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly enabled: {
                                                        readonly type: "boolean";
                                                    };
                                                };
                                            };
                                            readonly childrenRules: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly suitableForChildren: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly suitableForInfants: {
                                                        readonly type: "boolean";
                                                    };
                                                    readonly reason: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly description: "house rules details";
                                    };
                                    readonly deleted: {
                                        readonly type: "boolean";
                                        readonly default: false;
                                    };
                                    readonly deletedAt: {
                                        readonly type: "string";
                                        readonly format: "date-time";
                                    };
                                };
                                readonly required: readonly ["unitTypeId", "houseRules", "deleted"];
                            };
                        };
                    };
                    readonly description: "List of application listings filtered by given parameters";
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly properties: {
                        readonly total: {
                            readonly type: "integer";
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetApplicationReservation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly reservationId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of reservation";
                };
            };
            readonly required: readonly ["reservationId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly fields: {
                    readonly type: "string";
                    readonly examples: readonly ["status guestId listingId checkIn checkOut createdAt"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of the listing fields to return separated by spaces. The fields should be taken from Reservation object definition. When the field query parameter value is undefined the response will have the whole Reservation object";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "object";
                    readonly properties: {
                        readonly _id: {
                            readonly type: "string";
                            readonly examples: readonly ["5655b3dec03ca814016a5038"];
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly enum: readonly ["inquiry", "instant"];
                            readonly description: "`inquiry` `instant`";
                        };
                        readonly guestId: {
                            readonly type: "string";
                            readonly examples: readonly ["5655b3debf1fab1507921c33"];
                        };
                        readonly listingId: {
                            readonly type: "string";
                            readonly examples: readonly ["5319674d4930a7f09b075696"];
                        };
                        readonly checkInDateLocalized: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly examples: readonly ["2013-11-22"];
                        };
                        readonly checkOutDateLocalized: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly examples: readonly ["2013-11-27"];
                        };
                        readonly guestsCount: {
                            readonly type: "integer";
                            readonly examples: readonly [1];
                        };
                        readonly money: {
                            readonly type: "object";
                            readonly properties: {
                                readonly currency: {
                                    readonly type: "string";
                                    readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                    readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                };
                                readonly fareAccommodation: {
                                    readonly type: "number";
                                };
                                readonly hostPayout: {
                                    readonly type: "number";
                                };
                                readonly hostPayoutUsd: {
                                    readonly type: "number";
                                };
                                readonly invoiceItems: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                            };
                                            readonly amount: {
                                                readonly type: "number";
                                            };
                                            readonly currency: {
                                                readonly type: "string";
                                                readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                                readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                            };
                                            readonly type: {
                                                readonly type: "string";
                                            };
                                            readonly isTax: {
                                                readonly type: "boolean";
                                            };
                                            readonly metadata: {
                                                readonly type: "object";
                                                readonly additionalProperties: true;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly createdAt: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2014-12-17T08:33:44.510Z"];
                        };
                        readonly lastUpdatedAt: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly examples: readonly ["2016-04-19T19:50:54.292Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAvailableListings: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly minOccupancy: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum value of listing occupancy";
                };
                readonly numberOfBedrooms: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum amount of listing bedrooms";
                };
                readonly numberOfBathrooms: {
                    readonly type: "integer";
                    readonly default: 0;
                    readonly examples: readonly [1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The minimum amount of listing bathrooms";
                };
                readonly listingType: {
                    readonly type: "string";
                    readonly enum: readonly ["SINGLE", "MTL"];
                    readonly examples: readonly ["SINGLE"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing type.";
                };
                readonly propertyType: {
                    readonly type: "string";
                    readonly enum: readonly ["APARTMENT", "HOUSE", "LOFT", "BOAT", "CAMPER_RV", "CONDOMINIUM", "CHALET", "BED_Breakfast", "VILLA", "TENT", "OTHER", "CABIN", "TOWNHOUSE", "BUNGALOW", "HUT", "DORM", "PARKING_SPACE", "PLANE", "TREEHOUSE", "YURT", "TIPI", "IGLOO", "EARTH_HOUSE", "ISLAND", "CAVE", "CASTLE", "STUDIO"];
                    readonly examples: readonly ["APARTMENT"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing property type.";
                };
                readonly roomType: {
                    readonly type: "string";
                    readonly examples: readonly ["PRIVATE_ROOM"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The listing room type. All values of roomType are defined in RoomTypesQueryParameter definition";
                };
                readonly minPrice: {
                    readonly type: "number";
                    readonly examples: readonly [10];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum value of listing price. If it provided, the response will have listings which price is great or equal. Should be passed with currency query parameter";
                };
                readonly maxPrice: {
                    readonly type: "number";
                    readonly minimum: 1;
                    readonly examples: readonly [10];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum value of listing price. If it provided, the response will have listings which price is less or equal. Should be passed with currency query parameter";
                };
                readonly currency: {
                    readonly type: "string";
                    readonly examples: readonly ["EUR"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing price currency. Should be provided with minPrice query parameter";
                };
                readonly includeAmenities: {
                    readonly type: "string";
                    readonly examples: readonly ["PETS_ALLOWED,SMOKING_ALLOWED,SUITABLE_FOR_INFANTS,SUITABLE_FOR_CHILDREN"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing amenities separated by coma which should have listings. All values of amenities query parameters are defined in AmenitiesQueryParameter definition.";
                };
                readonly excludeAmenities: {
                    readonly type: "string";
                    readonly examples: readonly ["SMOKING_ALLOWED"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Listing amenities separated by coma which should not have listings. All values of amenities query parameters are defined in AmenitiesQueryParameter definition.";
                };
                readonly minLng: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly examples: readonly [24.052472];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum longitude";
                };
                readonly maxLng: {
                    readonly type: "number";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly examples: readonly [24.05687];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum longitude";
                };
                readonly minLat: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly examples: readonly [49.830034];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Minimum latitude";
                };
                readonly maxLat: {
                    readonly type: "number";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly examples: readonly [49.8366506];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Maximum latitude";
                };
                readonly city: {
                    readonly type: "string";
                    readonly examples: readonly ["Houston"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "City name from the listings address";
                };
                readonly country: {
                    readonly type: "string";
                    readonly examples: readonly ["United States"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "City name from the listings address";
                };
                readonly state: {
                    readonly type: "string";
                    readonly examples: readonly ["Texas"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "State name from the listings address";
                };
                readonly neighborhood: {
                    readonly type: "string";
                    readonly examples: readonly ["Harrisburg"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "neighborhood from the listings address";
                };
                readonly checkIn: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-20"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkin day in format YYYY-MM-DD";
                };
                readonly checkOut: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-25"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "checkout day in format YYYY-MM-DD";
                };
                readonly fields: {
                    readonly type: "string";
                    readonly examples: readonly ["_id address.city title accommodates"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The list of the listing fields to return separated by spaces. The fields should be taken from Listing object definition.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 20;
                    readonly examples: readonly [15];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of results within a subset. Default value is 20, max value is 100";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly examples: readonly ["eyJuZXh0Q3Vyc29yIjp7Imxpc3RpbmdJZCI6IjYwOWQ2YWI0MjU5ZWQxMDAyZDFlYWRjYiJ9fQ=="];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Provide cursor received from the response to interate over pages";
                };
            };
            readonly required: readonly ["checkIn", "checkOut"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly _id: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["SINGLE", "MTL"];
                                readonly description: "`SINGLE` `MTL`";
                            };
                            readonly propertyType: {
                                readonly type: "string";
                                readonly enum: readonly ["Apartment", "House", "Loft", "Boat", "Camper/RV", "Condominium", "Chalet", "Bed & Breakfast", "Villa", "Tent", "Other", "Cabin", "Townhouse", "Bungalow", "Hut", "Dorm", "Parking Space", "Plane", "Treehouse", "Yurt", "Tipi", "Igloo", "Earth House", "Island", "Cave", "Castle", "Studio"];
                                readonly description: "`Apartment` `House` `Loft` `Boat` `Camper/RV` `Condominium` `Chalet` `Bed & Breakfast` `Villa` `Tent` `Other` `Cabin` `Townhouse` `Bungalow` `Hut` `Dorm` `Parking Space` `Plane` `Treehouse` `Yurt` `Tipi` `Igloo` `Earth House` `Island` `Cave` `Castle` `Studio`";
                            };
                            readonly roomType: {
                                readonly type: "string";
                                readonly enum: readonly ["Private room", "Entire home/apt", "Shared room"];
                                readonly description: "`Private room` `Entire home/apt` `Shared room`";
                            };
                            readonly title: {
                                readonly type: "string";
                            };
                            readonly accommodates: {
                                readonly type: "integer";
                            };
                            readonly address: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly city: {
                                        readonly type: "string";
                                    };
                                    readonly country: {
                                        readonly type: "string";
                                    };
                                    readonly full: {
                                        readonly type: "string";
                                    };
                                    readonly lat: {
                                        readonly type: "number";
                                    };
                                    readonly lng: {
                                        readonly type: "number";
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                    };
                                    readonly street: {
                                        readonly type: "string";
                                    };
                                    readonly neighborhood: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly timezone: {
                                readonly type: "string";
                            };
                            readonly allotment: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly amenities: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Accessible-height bed", "Accessible-height toilet", "Air conditioning", "Babysitter recommendations", "Baby bath", "Baby monitor", "Bathtub", "BBQ grill", "Beach essentials", "Bed linens", "Breakfast", "Cable TV", "Carbon monoxide detector", "Cat(s)", "Changing table", "Children's books and toys", "Children's dinnerware", "Cleaning before checkout", "Coffee maker", "Communal pool", "Cooking basics", "Crib", "Disabled parking spot", "Dishes and silverware", "Dishwasher", "Dog(s)", "Doorman", "Dryer", "Elevator in building", "Essentials", "Ethernet connection", "EV charger", "Extra pillows and blankets", "Fireplace guards", "Fire extinguisher", "Firm mattress", "First aid kit", "Flat smooth pathway to front door", "Free parking on premises", "Game console", "Garden or backyard", "Grab-rails for shower and toilet", "Gym", "Hair dryer", "Hangers", "Heating", "High chair", "Hot tub", "Hot water", "Indoor fireplace", "Indoor pool", "Internet", "Iron", "Kitchen", "Laptop friendly workspace", "Long term stays allowed", "Luggage dropoff allowed", "Microwave", "Other pet(s)", "Outdoor pool", "Outlet covers", "Oven", "Pack 'n Play/travel crib", "Path to entrance lit at night", "Patio or balcony", "Pets allowed", "Pets live on this property", "Pocket wifi", "Private entrance", "Private pool", "Refrigerator", "Roll-in shower with shower bench or chair", "Room-darkening shades", "Shampoo", "Single level home", "Smoke detector", "Smoking allowed", "Stair gates", "Step-free access", "Stove", "Suitable for children (2-12 years)", "Suitable for infants (under 2 years)", "Swimming pool", "Table corner guards", "Tub with shower bench", "TV", "Washer", "Wide clearance to bed", "Wide clearance to shower and toilet", "Wide doorway", "Wide hallway clearance", "Window guards", "Wireless Internet"];
                                    readonly description: "`Accessible-height bed` `Accessible-height toilet` `Air conditioning` `Babysitter recommendations` `Baby bath` `Baby monitor` `Bathtub` `BBQ grill` `Beach essentials` `Bed linens` `Breakfast` `Cable TV` `Carbon monoxide detector` `Cat(s)` `Changing table` `Children's books and toys` `Children's dinnerware` `Cleaning before checkout` `Coffee maker` `Communal pool` `Cooking basics` `Crib` `Disabled parking spot` `Dishes and silverware` `Dishwasher` `Dog(s)` `Doorman` `Dryer` `Elevator in building` `Essentials` `Ethernet connection` `EV charger` `Extra pillows and blankets` `Fireplace guards` `Fire extinguisher` `Firm mattress` `First aid kit` `Flat smooth pathway to front door` `Free parking on premises` `Game console` `Garden or backyard` `Grab-rails for shower and toilet` `Gym` `Hair dryer` `Hangers` `Heating` `High chair` `Hot tub` `Hot water` `Indoor fireplace` `Indoor pool` `Internet` `Iron` `Kitchen` `Laptop friendly workspace` `Long term stays allowed` `Luggage dropoff allowed` `Microwave` `Other pet(s)` `Outdoor pool` `Outlet covers` `Oven` `Pack 'n Play/travel crib` `Path to entrance lit at night` `Patio or balcony` `Pets allowed` `Pets live on this property` `Pocket wifi` `Private entrance` `Private pool` `Refrigerator` `Roll-in shower with shower bench or chair` `Room-darkening shades` `Shampoo` `Single level home` `Smoke detector` `Smoking allowed` `Stair gates` `Step-free access` `Stove` `Suitable for children (2-12 years)` `Suitable for infants (under 2 years)` `Swimming pool` `Table corner guards` `Tub with shower bench` `TV` `Washer` `Wide clearance to bed` `Wide clearance to shower and toilet` `Wide doorway` `Wide hallway clearance` `Window guards` `Wireless Internet`";
                                };
                            };
                            readonly bathrooms: {
                                readonly type: "integer";
                            };
                            readonly bedrooms: {
                                readonly type: "integer";
                            };
                            readonly beds: {
                                readonly type: "integer";
                            };
                            readonly picture: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly thumbnail: {
                                        readonly type: "string";
                                    };
                                    readonly regular: {
                                        readonly type: "string";
                                    };
                                    readonly large: {
                                        readonly type: "string";
                                    };
                                    readonly caption: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly pictures: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly original: {
                                            readonly type: "string";
                                        };
                                        readonly large: {
                                            readonly type: "string";
                                        };
                                        readonly regular: {
                                            readonly type: "string";
                                        };
                                        readonly thumbnail: {
                                            readonly type: "string";
                                        };
                                        readonly caption: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                            readonly prices: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly basePrice: {
                                        readonly type: "number";
                                        readonly examples: readonly [1];
                                    };
                                    readonly currency: {
                                        readonly type: "string";
                                        readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                        readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                    };
                                    readonly monthlyPriceFactor: {
                                        readonly type: "number";
                                    };
                                    readonly weeklyPriceFactor: {
                                        readonly type: "number";
                                    };
                                    readonly extraPersonFee: {
                                        readonly type: "number";
                                    };
                                    readonly cleaningFee: {
                                        readonly type: "number";
                                    };
                                    readonly petFee: {
                                        readonly type: "number";
                                    };
                                };
                            };
                            readonly publicDescription: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly summary: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly nightlyRates: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                    readonly description: "List of available listings";
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly properties: {
                        readonly total: {
                            readonly type: "integer";
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCalendarByListingId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly listingId: {
                    readonly type: "string";
                    readonly examples: readonly ["5bf544a600a9b000389f81d8"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of listing to return";
                };
            };
            readonly required: readonly ["listingId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-21"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Begin of calendar form period in format YYYY-MM-DD";
                };
                readonly to: {
                    readonly type: "string";
                    readonly examples: readonly ["2021-12-25"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "End of calendar form period in format YYYY-MM-DD";
                };
            };
            readonly required: readonly ["from", "to"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly date: {
                        readonly type: "string";
                        readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                    };
                    readonly minNights: {
                        readonly type: "integer";
                    };
                    readonly isBaseMinNights: {
                        readonly type: "boolean";
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["available", "unavailable", "reserved", "booked"];
                        readonly description: "`available` `unavailable` `reserved` `booked`";
                    };
                    readonly cta: {
                        readonly type: "boolean";
                    };
                    readonly ctd: {
                        readonly type: "boolean";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetCities: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly skip: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly examples: readonly [25];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of cities to skip. Default value is 0";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly examples: readonly [100];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of results within a subset. Default value is 25, max value is 100";
                };
                readonly searchText: {
                    readonly type: "string";
                    readonly examples: readonly ["york"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search for given case insensitive text in city name";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly city: {
                                readonly type: "string";
                            };
                            readonly country: {
                                readonly type: "string";
                            };
                            readonly state: {
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly count: {
                    readonly type: "integer";
                };
                readonly skip: {
                    readonly type: "integer";
                };
                readonly limit: {
                    readonly type: "integer";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetMetasearchConfig: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly pointofsale: {
                    readonly type: "string";
                    readonly enum: readonly ["google"];
                    readonly examples: readonly ["google"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "possible variants of pointofsale - google";
                };
            };
            readonly required: readonly ["pointofsale"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly description: "property page url defined based on metasearch requirements";
                    readonly examples: readonly ["https://test-url.com/properties/(PARTNER-HOTEL-ID)?minOccupancy=(NUM-GUESTS)&amp;checkIn=(CHECKINYEAR)-(CHECKINMONTH)-(CHECKINDAY)&amp;checkOut=(CHECKOUTYEAR)-(CHECKOUTMONTH)-(CHECKOUTDAY)&amp;pointofsale=google"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetPaymentProviderByListingId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly listingId: {
                    readonly type: "string";
                    readonly examples: readonly ["5bf544a600a9b000389f81d8"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of listing to return";
                };
            };
            readonly required: readonly ["listingId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                };
                readonly providerType: {
                    readonly type: "string";
                };
                readonly providerAccountId: {
                    readonly type: "string";
                };
                readonly serviceProviderAccountId: {
                    readonly type: "integer";
                };
                readonly serviceProviderSubAccountId: {
                    readonly type: "integer";
                };
                readonly status: {
                    readonly type: "string";
                };
                readonly paymentProcessorName: {
                    readonly type: "string";
                };
                readonly accountName: {
                    readonly type: "string";
                };
                readonly paymentProcessorId: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetQuoteReservationById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly reservationId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e380020773542"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of reservation";
                };
            };
            readonly required: readonly ["reservationId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                };
                readonly confirmedAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly source: {
                    readonly type: "string";
                };
                readonly accountId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                    readonly description: "id of Guesty account";
                };
                readonly confirmationCode: {
                    readonly type: "string";
                };
                readonly platform: {
                    readonly type: "string";
                };
                readonly bookerId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                };
                readonly status: {
                    readonly type: "string";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly moneyId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                };
                readonly conversationId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                };
                readonly ratePlanId: {
                    readonly type: "string";
                };
                readonly unitTypeId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                };
                readonly guestsCount: {
                    readonly type: "number";
                };
                readonly checkInDateLocalized: {
                    readonly type: "string";
                    readonly description: "checkin day in format YYYY-MM-DD";
                };
                readonly checkOutDateLocalized: {
                    readonly type: "string";
                    readonly description: "checkout day in format YYYY-MM-DD";
                };
                readonly eta: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly etd: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly unitId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                };
                readonly stay: {
                    readonly type: "array";
                    readonly items: {
                        readonly properties: {
                            readonly checkInDateLocalized: {
                                readonly type: "string";
                                readonly description: "checkin day in format YYYY-MM-DD";
                            };
                            readonly checkOutDateLocalized: {
                                readonly type: "string";
                                readonly description: "checkout day in format YYYY-MM-DD";
                            };
                            readonly ratePlanId: {
                                readonly type: "string";
                            };
                            readonly unitTypeId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                            };
                            readonly guestsCount: {
                                readonly type: "number";
                            };
                            readonly eta: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly etd: {
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly unitId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                            };
                        };
                        readonly type: "object";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetReviewsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly skip: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of items to skip before starting to collect the result set.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly examples: readonly [100];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The numbers of items to return.";
                };
                readonly channelId: {
                    readonly type: "string";
                    readonly enum: readonly ["airbnb2", "bookingCom"];
                    readonly examples: readonly ["airbnb2"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Channel name.";
                };
                readonly listingId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Guesty listingId.";
                };
                readonly reservationId: {
                    readonly type: "string";
                    readonly pattern: "^[0-9a-fA-F]{24}$";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Guesty reservationId.";
                };
                readonly externalReservationId: {
                    readonly type: "string";
                    readonly examples: readonly ["2845111736"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Channel reservationId.";
                };
                readonly externalReviewId: {
                    readonly type: "string";
                    readonly examples: readonly ["7KHbotVSjAEtesr"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Channel reviewId. If this param is passed, others will be skipped";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                    readonly examples: readonly ["2021-12-15"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Start date-time of get reviews.";
                };
                readonly endDate: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly pattern: "^\\d{4}-\\d{2}-\\d{2}$";
                    readonly examples: readonly ["2021-12-16"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "End date-time of get reviews.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 100;
                };
                readonly skip: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly default: 0;
                };
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly _id: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty review";
                            };
                            readonly accountId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty account";
                            };
                            readonly externalReviewId: {
                                readonly type: "string";
                                readonly description: "id of review in channel";
                            };
                            readonly channelId: {
                                readonly type: "string";
                                readonly description: "channel id\n\n`bookingCom` `airbnb2`";
                                readonly enum: readonly ["bookingCom", "airbnb2"];
                            };
                            readonly subListingId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty MU child listing in case related reservation is assigned to it";
                            };
                            readonly listingId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty listing that integrated with channel or related reservation is assigned to";
                            };
                            readonly complexId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty complex if listing integrated with channel is assigned to";
                            };
                            readonly externalListingId: {
                                readonly type: "string";
                                readonly description: "id of airbnb listing or booking.com room to which review belong to";
                            };
                            readonly externalComplexId: {
                                readonly type: "string";
                                readonly description: "id of hotel for booking.com, empty for airbnb";
                            };
                            readonly reservationId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of Guesty reservation linked to review";
                            };
                            readonly externalReservationId: {
                                readonly type: "string";
                                readonly description: "id of linked reservation in channel";
                            };
                            readonly guestId: {
                                readonly type: "string";
                                readonly pattern: "^[0-9a-fA-F]{24}$";
                                readonly description: "id of guest in Guesty";
                            };
                            readonly createdAt: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "date-time of creation in channel";
                            };
                            readonly updatedAt: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "date-time of last update in channel";
                            };
                            readonly rawReview: {
                                readonly type: "object";
                                readonly description: "raw review object received from channel";
                                readonly additionalProperties: true;
                            };
                            readonly reviewReplies: {
                                readonly type: "array";
                                readonly items: {
                                    readonly properties: {
                                        readonly reviewReply: {
                                            readonly type: "string";
                                            readonly description: "text of reply";
                                        };
                                        readonly status: {
                                            readonly type: "string";
                                            readonly enum: readonly ["COMPLETED", "FAILED", "PENDING"];
                                            readonly description: "`COMPLETED` `FAILED` `PENDING`";
                                        };
                                        readonly replyAt: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                        };
                                    };
                                    readonly type: "object";
                                };
                            };
                        };
                        readonly required: readonly ["_id", "accountId", "externalReviewId", "externalListingId", "externalReservationId", "channelId", "listingId", "rawReview", "createdAt", "updatedAt"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ManageRatePlanQuoteCoupons: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly coupons: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
                readonly description: "it will set quote coupons to coupon-1 and coupon-2 and if the quote had another ones the request will remove them";
                readonly examples: readonly ["coupon-1", "coupon-3"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly quoteId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of quote";
                };
            };
            readonly required: readonly ["quoteId"];
        }];
    };
    readonly response: {
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReplaceUpsellFees: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly additionalFeeIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["61f984538b908351a18d2c75"];
                };
            };
            readonly ratePlanIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["61f984538b908351a18d2c75"];
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly inquiryId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of inquiry";
                };
            };
            readonly required: readonly ["inquiryId"];
        }];
    };
    readonly response: {
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RetrieveQuoteById: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly quoteId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of quote";
                };
            };
            readonly required: readonly ["quoteId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly _id: {
                    readonly type: "string";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly expiresAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
                readonly promotions: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly adjustment: {
                            readonly type: "integer";
                        };
                    };
                };
                readonly coupons: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["percentage"];
                                readonly description: "`percentage`";
                            };
                            readonly code: {
                                readonly type: "string";
                            };
                            readonly adjustment: {
                                readonly type: "integer";
                            };
                        };
                    };
                };
                readonly rates: {
                    readonly type: "object";
                    readonly properties: {
                        readonly quoteId: {
                            readonly type: "string";
                            readonly description: "A specific financial calculation process in scope of which it was done (quote based on specific rate plan only";
                        };
                        readonly ratePlans: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly _id: {
                                        readonly type: "string";
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                    };
                                    readonly mealPlans: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cancellationPolicy: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                    readonly cancellationFee: {
                                        readonly type: "string";
                                    };
                                    readonly priceAdjustment: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly type: {
                                                readonly type: "string";
                                            };
                                            readonly direction: {
                                                readonly type: "string";
                                            };
                                            readonly amount: {
                                                readonly type: "number";
                                            };
                                        };
                                    };
                                    readonly days: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly date: {
                                                    readonly type: "string";
                                                    readonly format: "date";
                                                };
                                                readonly price: {
                                                    readonly type: "integer";
                                                };
                                                readonly currency: {
                                                    readonly type: "string";
                                                };
                                                readonly basePrice: {
                                                    readonly type: "integer";
                                                };
                                                readonly rateStrategy: {
                                                    readonly type: "integer";
                                                };
                                                readonly ratePlan: {
                                                    readonly type: "integer";
                                                };
                                                readonly lengthOfStay: {
                                                    readonly type: "integer";
                                                };
                                            };
                                        };
                                    };
                                    readonly money: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly invoiceItems: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly title: {
                                                            readonly type: "string";
                                                        };
                                                        readonly amount: {
                                                            readonly type: "number";
                                                        };
                                                        readonly currency: {
                                                            readonly type: "string";
                                                            readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                                            readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                                        };
                                                        readonly type: {
                                                            readonly type: "string";
                                                        };
                                                        readonly normalType: {
                                                            readonly type: "string";
                                                        };
                                                        readonly description: {
                                                            readonly type: "string";
                                                        };
                                                    };
                                                };
                                            };
                                            readonly _id: {
                                                readonly type: "string";
                                            };
                                            readonly fareAccommodationAdjusted: {
                                                readonly type: "number";
                                            };
                                            readonly currency: {
                                                readonly type: "string";
                                                readonly enum: readonly ["USD", "EUR", "AUD", "CAD", "JPY", "ILS", "GBP", "HKD", "NOK", "CZK", "BRL", "CHF", "THB", "ZAR", "MYR", "KRW", "IDR", "PHP", "INR", "NZD", "TWD", "PLN", "SGD", "TRY", "SEK", "VND", "ARS", "CNY", "DKK", "MXN"];
                                                readonly description: "`USD` `EUR` `AUD` `CAD` `JPY` `ILS` `GBP` `HKD` `NOK` `CZK` `BRL` `CHF` `THB` `ZAR` `MYR` `KRW` `IDR` `PHP` `INR` `NZD` `TWD` `PLN` `SGD` `TRY` `SEK` `VND` `ARS` `CNY` `DKK` `MXN`";
                                            };
                                            readonly fareAccommodation: {
                                                readonly type: "number";
                                            };
                                            readonly fareCleaning: {
                                                readonly type: "number";
                                            };
                                            readonly totalFees: {
                                                readonly type: "number";
                                            };
                                            readonly subTotalPrice: {
                                                readonly type: "number";
                                            };
                                            readonly hostPayout: {
                                                readonly type: "number";
                                            };
                                            readonly hostPayoutUsd: {
                                                readonly type: "number";
                                            };
                                            readonly totalTaxes: {
                                                readonly type: "number";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RetrieveUpsellFee: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly quoteId: {
                    readonly type: "string";
                    readonly examples: readonly ["5d6e7a7ebf8e3800207735ae"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of quote";
                };
                readonly listingId: {
                    readonly type: "string";
                    readonly examples: readonly ["5bf544a600a9b000389f81d8"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of listing";
                };
            };
            readonly required: readonly ["quoteId", "listingId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly _id: {
                        readonly type: "string";
                        readonly examples: readonly ["61f984538b908351a18d2c75"];
                    };
                    readonly value: {
                        readonly type: "number";
                        readonly examples: readonly [10];
                    };
                    readonly isPercentage: {
                        readonly type: "boolean";
                        readonly examples: readonly [false];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly examples: readonly ["Additional bed"];
                    };
                    readonly channelFeeType: {
                        readonly type: "string";
                        readonly enum: readonly ["ADDITIONAL_BED", "AIR_CONDITIONING", "EARLY_CHECK_IN", "LATE_CHECK_IN", "BABY_BED", "CLEANING", "CLUB_CARD", "CONCIERGE", "EARLY_CHECKOUT", "LATE_CHECKOUT", "DEPOSIT", "ELECTRICITY", "FOOD", "HEATING", "INTERNET", "LAUNDRY", "LINENS", "TOWELS", "MANAGEMENT", "OIL", "PARKING", "PET", "POOL", "POOL_HEATING", "RESORT", "SERVICE", "TOILETRIES", "TOUR", "TRANSPORTATION", "CAR_RENTAL", "WATER", "WOOD", "TRANSFER", "HOUSEKEEPING", "INSURANCE", "COMMUNITY", "CREDIT_CARD_PROCESSING_FEE", "DAMAGE_WAIVER", "VIP_SERVICES", "PAYMENT_FEE", "ADDITIONAL_CHARGE", "MISCELLANEOUS", "SHIPPING", "VALET", "ACTIVITIES", "FLIGHTS", "GIFT_BASKET", "SPA", "CHEF", "MEET_AND_GREET", "DOCK_FEE", "UTILITY_FEE", "HOT_TUB", "BOOKING_FEE", "BREAKFAST", "BEVERAGE", "MEAL", "WELLNESS", "MINIBAR", "BUSINESS_CENTER", "WIFI", "GUEST_SERVICE", "COMMISSION_CHARGE", "EQUIPMENT_RENTAL", "RESERVATION_FEE", "DAMAGE_CHARGE", "HOMEOWNERS_ASSOCIATION", "GOLF_CART_RENTAL"];
                        readonly description: "`ADDITIONAL_BED` `AIR_CONDITIONING` `EARLY_CHECK_IN` `LATE_CHECK_IN` `BABY_BED` `CLEANING` `CLUB_CARD` `CONCIERGE` `EARLY_CHECKOUT` `LATE_CHECKOUT` `DEPOSIT` `ELECTRICITY` `FOOD` `HEATING` `INTERNET` `LAUNDRY` `LINENS` `TOWELS` `MANAGEMENT` `OIL` `PARKING` `PET` `POOL` `POOL_HEATING` `RESORT` `SERVICE` `TOILETRIES` `TOUR` `TRANSPORTATION` `CAR_RENTAL` `WATER` `WOOD` `TRANSFER` `HOUSEKEEPING` `INSURANCE` `COMMUNITY` `CREDIT_CARD_PROCESSING_FEE` `DAMAGE_WAIVER` `VIP_SERVICES` `PAYMENT_FEE` `ADDITIONAL_CHARGE` `MISCELLANEOUS` `SHIPPING` `VALET` `ACTIVITIES` `FLIGHTS` `GIFT_BASKET` `SPA` `CHEF` `MEET_AND_GREET` `DOCK_FEE` `UTILITY_FEE` `HOT_TUB` `BOOKING_FEE` `BREAKFAST` `BEVERAGE` `MEAL` `WELLNESS` `MINIBAR` `BUSINESS_CENTER` `WIFI` `GUEST_SERVICE` `COMMISSION_CHARGE` `EQUIPMENT_RENTAL` `RESERVATION_FEE` `DAMAGE_CHARGE` `HOMEOWNERS_ASSOCIATION` `GOLF_CART_RENTAL`";
                    };
                    readonly isUpsell: {
                        readonly type: "boolean";
                        readonly examples: readonly [true];
                    };
                    readonly upsell: {
                        readonly type: "object";
                        readonly properties: {
                            readonly images: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly url: {
                                            readonly type: "string";
                                            readonly examples: readonly ["https://assets.guesty.com/image/upload/v1723994644/production/financials/upsells/raxfb5htryx0b2qewthk.jpg"];
                                        };
                                        readonly isDefault: {
                                            readonly type: "boolean";
                                            readonly examples: readonly [true];
                                        };
                                    };
                                };
                            };
                            readonly description: {
                                readonly type: "string";
                                readonly examples: readonly ["Test"];
                            };
                        };
                    };
                    readonly multiplier: {
                        readonly type: "string";
                        readonly enum: readonly ["PER_NIGHT", "PER_GUEST", "PER_GUEST_PER_NIGHT", "PER_STAY"];
                        readonly description: "`PER_NIGHT` `PER_GUEST` `PER_GUEST_PER_NIGHT` `PER_STAY`";
                    };
                    readonly price: {
                        readonly type: "number";
                        readonly examples: readonly [10];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpsertMetasearchConfig: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["url"];
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "property page url defined based on metasearch requirements";
                readonly examples: readonly ["https://test-url.com/properties/(PARTNER-HOTEL-ID)?minOccupancy=(NUM-GUESTS)&amp;checkIn=(CHECKINYEAR)-(CHECKINMONTH)-(CHECKINDAY)&amp;checkOut=(CHECKOUTYEAR)-(CHECKOUTMONTH)-(CHECKOUTDAY)&amp;pointofsale=google"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly pointofsale: {
                    readonly type: "string";
                    readonly enum: readonly ["google"];
                    readonly examples: readonly ["google"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "possible variants of pointofsale - google";
                };
            };
            readonly required: readonly ["pointofsale"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly url: {
                    readonly type: "string";
                    readonly description: "property page url defined based on metasearch requirements";
                    readonly examples: readonly ["https://test-url.com/properties/(PARTNER-HOTEL-ID)?minOccupancy=(NUM-GUESTS)&amp;checkIn=(CHECKINYEAR)-(CHECKINMONTH)-(CHECKINDAY)&amp;checkOut=(CHECKOUTYEAR)-(CHECKOUTMONTH)-(CHECKOUTDAY)&amp;pointofsale=google"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message", "data"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                        };
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly data: {
                            readonly type: "object";
                            readonly required: readonly ["requestId"];
                            readonly properties: {
                                readonly requestId: {
                                    readonly type: "string";
                                };
                                readonly moreDetails: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { CalculateReservationMoney, CreateInquiryReservationFromQuote, CreateInstantReservationFromQuote, CreateRerservation, CreateReservationQuote, GetApplicationListing, GetApplicationListingsList, GetApplicationReservation, GetAvailableListings, GetCalendarByListingId, GetCities, GetMetasearchConfig, GetPaymentProviderByListingId, GetQuoteReservationById, GetReviewsList, ManageRatePlanQuoteCoupons, ReplaceUpsellFees, RetrieveQuoteById, RetrieveUpsellFee, UpsertMetasearchConfig };

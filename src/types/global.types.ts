import { BaseQueryApi } from "@reduxjs/toolkit/query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
    data: {
        message: string,
        stack: string,
        success: boolean
    };
    status: number
}

export type TResponse<T> = {
    success: boolean;
    data?: T;
    error?: TError;
    meta?: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    }
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi
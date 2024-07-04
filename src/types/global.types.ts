import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { Key } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
    data: {
        message: string,
        stack: string,
        success: boolean
        errorSources?: { path: string, message: string }
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

export type TQueryParams = {
    name: string;
    value: boolean | Key;
}
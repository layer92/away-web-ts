import { Box } from "away-core/Box";

// https://en.wikipedia.org/wiki/HTTP#Request_methods
export const AllHttpMethodsLowercase = ["get","post","patch","put","options","head","delete","connect","trace"];
export type HttpMethodLowercase = "get"|"post"|"patch"|"put"|"options"|"head"|"delete"|"connect"|"trace";
    
export class HttpMethodLowercaseBox extends Box<HttpMethodLowercase>{
    private readonly __HttpMethodLowercaseBox__:undefined;
};
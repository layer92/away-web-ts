import { Box } from "away-core/Box";
import { Expect } from "away-core/Expect";
import { OnException } from "away-core/OnException";
import {URL} from "node:url";

export class UrlBox extends Box<string>{
    private __UrlBox__:undefined;
    
    constructor(data:string,onValidationFail:OnException){
        try{
            new URL(data);
        }catch(e){
            onValidationFail();
            throw new Error(`data: note a valid URL: ${data}`);
        }
        super(data);
    }   

    /** does not include "://" */
    getProtocol(){
        return new URL(this._data).protocol;
    }

    getAuthority(){
        // the authority is incorrectly called "host" in JS's URL class
        return new URL(this._data).host
    }

    getHost(){
        return new URL(this._data).hostname;
    }

    getPath(){
        return new URL(this._data).pathname;
    }
    
    hasPath(){
        return this.getPath().length;
    }

    getLastPathNode(){
        this.getPath().split("/").slice(-1)[0];
    }

    /** Given /foo/ABC/bar/baz, returns "ABC" - Useful for common API schemes. */
    getNodeAfter({node,onNodeNotFound}:{node:string,onNodeNotFound:OnException}){
        const nodes = this.getPath().split("/");
        const index = nodes.indexOf(node);
        Expect(index!==-1,()=>"search node not found: "+node+" in url: "+this._data,onNodeNotFound);
        const result = nodes[index+1];
        Expect(result,()=>`node after search node ${node} not found in url: `+this._data,onNodeNotFound);
        return result;
    }

}


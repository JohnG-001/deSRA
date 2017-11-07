"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var GenesService = (function () {
    function GenesService() {
        // can only use *ngIf and *ngFor on Arrays
        this.genes = [];
        this.genesUrl = "https://trace.ncbi.nlm.nih.gov/Traces/sra/";
        this.pageTitle = 'Genes from SRA';
        this.genes = [];
    }
    GenesService.prototype.ngOnInit = function () {
        // set ids before adding new row
        //this.setIDs();
    };
    // with Observable
    //getGenes(): Observable<GenesComponent[]> {
    //return this.http.get<GenesComponent[]>(this.genesUrl, {params: {'sp': 'runinfo', 'acc': 'SRR5970434'}})
    //    return this.http.get<GenesComponent[]>(this.genesUrl)
    //}
    // without Observable
    GenesService.prototype.getGenes = function () {
        //return this.http.get<GenesComponent[]>(this.genesUrl, {params: {'sp': 'runinfo', 'acc': 'SRR5970434'}})
        return this.http.get(this.genesUrl, { params: { 'sp': 'runinfo', 'acc': 'SRR5970434' } });
    };
    return GenesService;
}());
GenesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], GenesService);
exports.GenesService = GenesService;
//# sourceMappingURL=geneservice.service.js.map
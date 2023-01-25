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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareRecipientsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("../../entities/events/events.service");
let CareRecipientsController = class CareRecipientsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async getAllEvents(params) {
        return await this.eventsService.findAllBy(params.id);
    }
};
__decorate([
    (0, common_1.Get)('events'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CareRecipientsController.prototype, "getAllEvents", null);
CareRecipientsController = __decorate([
    (0, common_1.Controller)('care-recipients/:id'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], CareRecipientsController);
exports.CareRecipientsController = CareRecipientsController;
//# sourceMappingURL=care-recipients.controller.js.map
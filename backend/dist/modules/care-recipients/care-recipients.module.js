"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareRecipientsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_service_1 = require("../../entities/events/events.service");
const event_entity_1 = require("../../entities/events/event.entity");
const care_recipients_controller_1 = require("./care-recipients.controller");
let CareRecipientsModule = class CareRecipientsModule {
};
CareRecipientsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event])],
        providers: [events_service_1.EventsService],
        controllers: [care_recipients_controller_1.CareRecipientsController],
    })
], CareRecipientsModule);
exports.CareRecipientsModule = CareRecipientsModule;
//# sourceMappingURL=care-recipients.module.js.map
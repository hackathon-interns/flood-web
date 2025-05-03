import {NgModule} from "@angular/core";

// Providers
import {FilterService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from "primeng/api";

// Form
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {CheckboxModule} from 'primeng/checkbox';
import {ColorPickerModule} from 'primeng/colorpicker';
import {DatePickerModule} from 'primeng/datepicker';
import {EditorModule} from 'primeng/editor';
import {FloatLabelModule} from 'primeng/floatlabel';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {IftaLabelModule} from 'primeng/iftalabel';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputOtpModule} from 'primeng/inputotp';
import {InputTextModule} from 'primeng/inputtext';
import {KeyFilterModule} from 'primeng/keyfilter';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {SelectModule} from 'primeng/select';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SliderModule} from 'primeng/slider';
import {TextareaModule} from 'primeng/textarea';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {TreeSelectModule} from 'primeng/treeselect';

// Button
import {ButtonModule} from 'primeng/button';
import {SpeedDialModule} from 'primeng/speeddial';
import {SplitButtonModule} from 'primeng/splitbutton';

//Data
import {DataViewModule} from 'primeng/dataview';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {PaginatorModule} from 'primeng/paginator';
import {PickListModule} from 'primeng/picklist';
import {TableModule} from 'primeng/table';
import {TimelineModule} from 'primeng/timeline';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {ScrollerModule} from 'primeng/scroller';
import {CalendarModule} from 'primeng/calendar';

// Panel
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SplitterModule} from 'primeng/splitter';
import {StepperModule} from 'primeng/stepper';
import {TabsModule} from 'primeng/tabs';
import {ToolbarModule} from 'primeng/toolbar';

// Overlay
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DrawerModule} from 'primeng/drawer';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {PopoverModule} from 'primeng/popover';
import {TooltipModule} from 'primeng/tooltip';

// File
import {FileUploadModule} from 'primeng/fileupload';

// Menu
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DockModule} from 'primeng/dock';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {StepsModule} from 'primeng/steps';
import {TieredMenuModule} from 'primeng/tieredmenu';

// Charts
import {ChartModule} from 'primeng/chart';

// Messages
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';

// Media
import {CarouselModule} from 'primeng/carousel';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {ImageCompareModule} from 'primeng/imagecompare';

// Misc
import {AnimateOnScrollModule} from 'primeng/animateonscroll';
import {AutoFocusModule} from 'primeng/autofocus';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {ChipModule} from 'primeng/chip';
import {FocusTrapModule} from 'primeng/focustrap';
import {FluidModule} from 'primeng/fluid';
import {InplaceModule} from 'primeng/inplace';
import {MeterGroupModule} from 'primeng/metergroup';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SkeletonModule} from 'primeng/skeleton';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';

const formImports = [
    AutoCompleteModule,
    CascadeSelectModule,
    CheckboxModule,
    ColorPickerModule,
    DatePickerModule,
    EditorModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    IftaLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    InputNumberModule,
    InputOtpModule,
    InputTextModule,
    KeyFilterModule,
    KnobModule,
    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    RatingModule,
    SelectModule,
    SelectButtonModule,
    SliderModule,
    TextareaModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    TreeSelectModule
];

const buttonImports = [
    ButtonModule,
    SpeedDialModule,
    SplitButtonModule,
];

const dataImports = [
    DataViewModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PickListModule,
    TableModule,
    TimelineModule,
    TreeModule,
    TreeTableModule,
    ScrollerModule,
    CalendarModule,
];

const panelImports = [
    AccordionModule,
    CardModule,
    DividerModule,
    FieldsetModule,
    PanelModule,
    ScrollPanelModule,
    SplitterModule,
    StepperModule,
    TabsModule,
    ToolbarModule,
];

const overlayImports = [
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DrawerModule,
    DynamicDialogModule,
    PopoverModule,
    TooltipModule,
];

const fileImports = [
    FileUploadModule
];

const menuImports = [
    BreadcrumbModule,
    ContextMenuModule,
    DockModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    PanelMenuModule,
    StepsModule,
    TieredMenuModule,
];

const chartsImports = [
    ChartModule,
];

const messagesImports = [
    MessageModule,
    ToastModule,
];

const mediaImports = [
    CarouselModule,
    GalleriaModule,
    ImageModule,
    ImageCompareModule,
];

const miscImports = [
    AnimateOnScrollModule,
    AutoFocusModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    OverlayBadgeModule,
    ChipModule,
    FocusTrapModule,
    FluidModule,
    InplaceModule,
    MeterGroupModule,
    ScrollTopModule,
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RippleModule,
    StyleClassModule,
    TagModule,
    TerminalModule,
];

const providers = [
    FilterService,
    ConfirmationService,
    DialogService,
    MessageService
];


@NgModule({
    imports: [
        ...formImports,
        ...buttonImports,
        ...dataImports,
        ...panelImports,
        ...overlayImports,
        ...fileImports,
        ...menuImports,
        ...chartsImports,
        ...messagesImports,
        ...mediaImports,
        ...miscImports,
    ],
    providers: [
        ...providers
    ],
    exports: [
        ...formImports,
        ...buttonImports,
        ...dataImports,
        ...panelImports,
        ...overlayImports,
        ...fileImports,
        ...menuImports,
        ...chartsImports,
        ...messagesImports,
        ...mediaImports,
        ...miscImports,
    ]
})
export class PrimeNGModule { }
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginationModule } from './pagination.module';
import { PaginationComponent, Pager } from './pagination.component';

fdescribe('PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [PaginationModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// it('should emit initial page when items are set', () => {
	// 	const items = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);
	// 	const initialPage = 2;
	// 	const pageSize = 10;
	// 	const maxPages = 5;

	// 	component.items = items;
	// 	component.initialPage = initialPage;
	// 	component.pageSize = pageSize;
	// 	component.maxPages = maxPages;

	// 	const emittedItems: string[] = [];
	// 	component.changePage.subscribe((pageOfItems: string[]) => {
	// 		console.log(pageOfItems);
	// 		emittedItems.push(...pageOfItems);
	// 	});

	// 	component.ngOnChanges({ items: { previousValue: undefined, currentValue: items, firstChange: true, isFirstChange: () => true } as any});

	// 	expect(emittedItems.length).toBe(pageSize);

	// 	const expectedPageItems = items.slice((initialPage - 1) * pageSize, initialPage * pageSize);
	// 	expect(emittedItems).toEqual(expectedPageItems);
	// });

	it('should paginate correctly', () => {
		const totalItems = 50;
		const currentPage = 3;
		const pageSize = 10;
		const maxPages = 5;

		const pager: Pager = component.paginate(totalItems, currentPage, pageSize, maxPages);

		expect(pager.currentPage).toBe(currentPage);
		expect(pager.pageSize).toBe(pageSize);
		expect(pager.totalPages).toBe(5); // Total pages should be 5 with 10 items per page
		expect(pager.startPage).toBe(1);
		expect(pager.endPage).toBe(5);
		expect(pager.startIndex).toBe(20); // Zero-based indexing, so 3rd page should start from index 20
		expect(pager.endIndex).toBe(29); // Zero-based indexing, so 3rd page should end at index 29
		expect(pager.pages.length).toBe(maxPages);
	});
});

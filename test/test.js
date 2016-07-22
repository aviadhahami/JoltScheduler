/**
 * Created by aviad on 7/22/2016.
 */

'use strict';
let chai = require('chai');
let JoltScheduler = require('./../index')

chai.should();

class TestSuite{
	
	static testInsertion() {
		let instance;
		beforeEach(() => {
			// Create a new Rectangle object before every test.
			instance = new JoltScheduler()
		});
		
		describe('Test Insertion',()=>{
			it('Size 0 on init', ()=>{
				instance.size.should.equal(0)
			});
			
			it('Size 1 after insertion',()=>{
				instance.insert({name:'a',st:123,callback:()=>{}})
				instance.size.should.equal(1)
			})
		})
	}
	
	static testInit(){
		describe('Test initialization', ()=>{
			it('Private HashedMinHeap', ()=>{
				let instance = new JoltScheduler();
				'undefined'.should.equal(typeof instance.dataSet)
			})
		})
	}
	
	static run(){
		describe('Test Suite',()=>{
				this.testInit();
				this.testInsertion();
			}
		)
	}
}

TestSuite.run();
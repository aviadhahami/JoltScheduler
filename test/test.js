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
			});
			
			it('Size 10 after insertions',()=>{
				for(let i=0;i<10;i++){
					instance.insert({name:'a'+i,st:i,callback:()=>{}})
				}
				instance.size.should.equal(10)
			});
		})
	}
	static testExtraction(){
		describe('test extraction',()=>{
			let instance;
			
			beforeEach(() => {
				// Create a new Rectangle object before every test.
				instance = new JoltScheduler()
			});
			
			it('Test id existance',()=>{
				let temp = {name:'a',st:123,callback:()=>{}};
				instance.insert(temp);
				(typeof instance.pop()._id).should.equal('string')
			});
			
			it('Test extracted object equality (emit id)',()=>{
				let temp = {name:'a',st:123,callback:()=>{}};
				instance.insert(temp)
				let res = instance.pop()
				temp.name.should.equal(res.name)
				temp.st.should.equal(res.st)
				temp.callback.should.equal(res.callback)
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
				this.testExtraction();
			}
		)
	}
}

TestSuite.run();
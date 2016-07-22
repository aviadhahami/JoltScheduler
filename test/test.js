/**
 * Created by aviad on 7/22/2016.
 */

'use strict';
let chai = require('chai');
let JoltScheduler = require('./../index')

chai.should();

class TestSuite{
	
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
				this.testInit()
			}
		)
	}
	
}

TestSuite.run();
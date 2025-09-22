const https = require('https');
const { performance } = require('perf_hooks');

console.log('💀 AGGRESSIVE RED-TEAM TEST - NO BULLSHIT ALLOWED');

function testEndpoint(url, testName) {
    return new Promise((resolve) => {
        const start = performance.now();

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const end = performance.now();
                const loadTime = end - start;

                console.log(`\n🎯 ${testName}`);
                console.log(`   Status: ${res.statusCode}`);
                console.log(`   Load time: ${Math.round(loadTime)}ms`);
                console.log(`   Size: ${data.length} bytes`);

                // Aggressive checks
                const issues = [];

                if (res.statusCode !== 200) issues.push('BAD STATUS CODE');
                if (loadTime > 5000) issues.push('TOO SLOW');
                if (!data.includes('<!DOCTYPE html>')) issues.push('NOT HTML');
                if (!data.includes('loadingOverlay')) issues.push('NO LOADING SYSTEM');
                if (!data.includes('try {') || !data.includes('catch')) issues.push('NO ERROR HANDLING');
                if (!data.includes('startBasicMode')) issues.push('NO FALLBACK');
                if (data.includes('alert(')) issues.push('USES ALERT (BAD UX)');

                if (issues.length === 0) {
                    console.log('   ✅ PASSES ALL AGGRESSIVE CHECKS');
                } else {
                    console.log('   ❌ ISSUES FOUND:');
                    issues.forEach(issue => console.log('      - ' + issue));
                }

                resolve({ passed: issues.length === 0, issues, loadTime });
            });
        }).on('error', (err) => {
            console.log(`   ❌ FAILED: ${err.message}`);
            resolve({ passed: false, issues: ['NETWORK_ERROR'], loadTime: 0 });
        });
    });
}

async function runAggressiveTest() {
    console.log('🚀 Testing main page...');

    const result = await testEndpoint('https://domusgpt.github.io/vib34d-unified-pulse-game/', 'MAIN PAGE');

    console.log('\n💀 FINAL VERDICT:');

    if (result.passed) {
        console.log('   🎉 TEST PASSED - NO BULLSHIT DETECTED');
        console.log('   ✅ Page loads correctly');
        console.log('   ✅ Has error handling');
        console.log('   ✅ Has fallback mode');
        console.log('   ✅ Has loading system');
        console.log('   ✅ Performance acceptable');
    } else {
        console.log('   ❌ TEST FAILED - BULLSHIT DETECTED');
        console.log('   Issues found:');
        result.issues.forEach(issue => console.log('     - ' + issue));
    }

    // Additional brutal checks
    console.log('\n🔥 BRUTAL EDGE CASE CHECKS:');

    if (result.loadTime < 100) {
        console.log('   ⚠️ Suspiciously fast load time (cached?)');
    }

    if (result.loadTime > 2000) {
        console.log('   ❌ TOO SLOW - Users will bounce');
    } else {
        console.log('   ✅ Load time acceptable');
    }

    console.log(`\n🏁 OVERALL: ${result.passed ? 'ROBUST SYSTEM' : 'NEEDS WORK'}`);
}

runAggressiveTest().catch(console.error);